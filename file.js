import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  LinearProgress
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import CryptoJS from "crypto-js";
import secrets from "../config/secrets";
import oneyeardata from "../data/oneyeardata.json";
import { format, parseISO, subMonths, startOfMonth, endOfMonth } from 'date-fns';

// Constants
const {
  REACT_APP_MAC_ID = "default-mac-id",
  REACT_APP_SECRET_KEY = "default-secret-key",
} = secrets || {};
const MAC_ID = "68cb50df-f21a-41cd-9338-2f635d395aef";
const SECRET_KEY = "6b4f1919-2b5a-4c0d-8c8c-d749dd787c13";
const APP_ID = "15";
const REQUEST_URI = "/v1/bridge_details";
const HOSTNAME = "emimapi.aexp.com";
const PORT = "443";
const HTTP_VERB = "POST";

// Utility Functions
const canonicalize = (obj) =>
  Array.isArray(obj)
    ? obj.map(canonicalize)
    : typeof obj === "object" && obj !== null
      ? Object.keys(obj)
          .sort()
          .reduce((acc, key) => ({ ...acc, [key]: canonicalize(obj[key]) }), {})
      : obj;

const createSignature = (message, secret) =>
  CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Base64);

const generateAuthHeader = (body, correlationId) => {
  const timestamp = Date.now().toString();
  const bodyHash = createSignature(body, SECRET_KEY);
  const macInput = `${timestamp}\n${correlationId}\n${HTTP_VERB}\n${REQUEST_URI}\n${HOSTNAME}\n${PORT}\n${bodyHash}\n`;
  const macSignature = createSignature(macInput, SECRET_KEY);
  let macId = `MAC_Id="${MAC_ID}",ts="${timestamp}",nonce="${correlationId}",bodyhash="${bodyHash}",mac="${macSignature}"`;
  return macId;
};

const callApi = async (url, method, headers, body) => {
  const response = await fetch(url, { method, headers, body });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} - ${text}`);
  }
  return await response.json();
};

const callMIMApi = async (payload) => {
  const canonicalPayload = JSON.stringify(canonicalize(payload));
  const correlationId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const authHeader = generateAuthHeader(canonicalPayload, correlationId);
  const response = await callApi(
    `https://${HOSTNAME}${REQUEST_URI}`,
    HTTP_VERB,
    {
      Authorization: authHeader,
      "Correlation-Id": correlationId,
      "App-Id": APP_ID,
      "Content-Type": "application/json",
    },
    canonicalPayload,
  );
  return response;
};

const sanitizeJSON = (jsonString) => {
  let sanitized = jsonString
    .replace(/\\n/g, "\\n")
    .replace(/\\'/g, "'")
    .replace(/'/g, '"')
    .replace(/None/g, "null")
    .replace(/True/g, "true")
    .replace(/False/g, "false")
    .replace(/\\\\"/g, '"')
    .replace(/(\w)"(\w)/g, "$1'$2")
    .replace(/\\n/g, " ");
  sanitized = sanitized
    .replace(/(\w)'(\w)/g, "$1__APOS__$2")
    .replace(/(\w)\\'(\w)/g, "$1__APOS__$2");
  sanitized = sanitized.replace(/'/g, '"');
  sanitized = sanitized.replace(/__APOS__/g, "'");
  return sanitized;
};

const filterResponseData = (data) => {
  const { live_notes, paging, bridge_participants, ...filteredData } = data;
  return filteredData;
};

// Calculate incident duration in hours
const calculateDuration = (start, end) => {
  if (!start || !end) return null;
  try {
    const startTime = parseISO(start);
    const endTime = parseISO(end);
    return (endTime - startTime) / (1000 * 60 * 60); // hours
  } catch {
    return null;
  }
};

// Component
function EMIMDashboard() {
  const [data, setData] = useState(null);
  const [oneYearData] = useState(oneyeardata);
  const [filters, setFilters] = useState({
    timeRange: "all",
    bridgeType: "",
    techPlatform: "",
    resolvingGroup: "",
    severity: ""
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const fetchData = async () => {
    setLoading(true);
    try {
      const mimPayload = {
        INC: "",
        bridge_status: 3,
        company_platform: "Digital Acquisition",
        day_offset_closed_bridges_data: 1,
      };
      const response = await callMIMApi(mimPayload);
      const sanitizedData = sanitizeJSON(response.data || "{}");
      const parsedData = JSON.parse(sanitizedData);
      const filteredData = filterResponseData(parsedData);
      setData(filteredData);
      setSnackbar({
        open: true,
        message: "Data fetched successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
      setSnackbar({
        open: true,
        message: error.message || "Failed to fetch data",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Process and combine data
  const processedData = useMemo(() => {
    const combined = [...(data ? [data] : []), ...oneYearData];
    
    return combined.map(item => ({
      ...item,
      duration: calculateDuration(item.bridge_start_time, item.bridge_end_time),
      month: item.bridge_start_time ? format(parseISO(item.bridge_start_time), 'MMM yyyy') : 'Unknown',
      status: item.bridge_end_time ? 'Resolved' : 'Active'
    }));
  }, [data, oneYearData]);

  // Filter data based on filters
  const filteredData = useMemo(() => {
    return processedData.filter(item => {
      return (
        (filters.timeRange === "all" || 
          (filters.timeRange === "month" && 
            item.bridge_start_time && 
            parseISO(item.bridge_start_time) > subMonths(new Date(), 1)) ||
          (filters.timeRange === "quarter" && 
            item.bridge_start_time && 
            parseISO(item.bridge_start_time) > subMonths(new Date(), 3))) &&
        (!filters.bridgeType || item.bridge_type === filters.bridgeType) &&
        (!filters.techPlatform || (item.tech_platform && item.tech_platform.includes(filters.techPlatform))) &&
        (!filters.resolvingGroup || item.lead_resolving_group === filters.resolvingGroup) &&
        (!filters.severity || (item.impact_info && item.impact_info.some(i => i.severity === filters.severity)))
      );
    });
  }, [processedData, filters]);

  // Prepare data for charts
  const chartData = useMemo(() => {
    // Monthly incidents
    const monthlyCounts = {};
    const severityCounts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    const typeCounts = {};
    const platformCounts = {};
    const resolutionTime = {};

    filteredData.forEach(item => {
      // Monthly counts
      const month = item.month;
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

      // Severity counts
      if (item.impact_info) {
        item.impact_info.forEach(impact => {
          if (severityCounts[impact.severity] !== undefined) {
            severityCounts[impact.severity] += 1;
          }
        });
      }

      // Bridge type counts
      const type = item.bridge_type || 'Unknown';
      typeCounts[type] = (typeCounts[type] || 0) + 1;

      // Platform counts
      if (item.tech_platform) {
        item.tech_platform.split(';').forEach(platform => {
          const trimmed = platform.trim();
          if (trimmed) {
            platformCounts[trimmed] = (platformCounts[trimmed] || 0) + 1;
          }
        });
      }

      // Resolution time
      if (item.duration !== null) {
        const group = item.lead_resolving_group || 'Unknown';
        if (!resolutionTime[group]) {
          resolutionTime[group] = { total: 0, count: 0 };
        }
        resolutionTime[group].total += item.duration;
        resolutionTime[group].count += 1;
      }
    });

    // Convert to array formats
    const monthlyData = Object.keys(monthlyCounts).map(key => ({
      month: key,
      incidents: monthlyCounts[key]
    })).sort((a, b) => parseISO(a.month) - parseISO(b.month));

    const severityData = Object.keys(severityCounts).map(key => ({
      name: key,
      value: severityCounts[key]
    }));

    const typeData = Object.keys(typeCounts).map(key => ({
      name: key,
      value: typeCounts[key]
    }));

    const platformData = Object.keys(platformCounts)
      .map(key => ({ name: key, value: platformCounts[key] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    const resolutionData = Object.keys(resolutionTime).map(key => ({
      group: key,
      avgHours: resolutionTime[key].total / resolutionTime[key].count
    })).sort((a, b) => b.avgHours - a.avgHours);

    return {
      monthlyData,
      severityData,
      typeData,
      platformData,
      resolutionData
    };
  }, [filteredData]);

  // Extract filter options
  const filterOptions = useMemo(() => {
    const types = new Set();
    const platforms = new Set();
    const groups = new Set();
    
    processedData.forEach(item => {
      if (item.bridge_type) types.add(item.bridge_type);
      if (item.tech_platform) {
        item.tech_platform.split(';').forEach(p => platforms.add(p.trim()));
      }
      if (item.lead_resolving_group) groups.add(item.lead_resolving_group);
    });
    
    return {
      bridgeTypes: Array.from(types),
      techPlatforms: Array.from(platforms),
      resolvingGroups: Array.from(groups),
      severities: ['Critical', 'High', 'Medium', 'Low']
    };
  }, [processedData]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalIncidents = filteredData.length;
    const activeIncidents = filteredData.filter(i => !i.bridge_end_time).length;
    const avgResolution = filteredData.reduce((sum, item) => 
      item.duration ? sum + item.duration : sum, 0) / 
      (filteredData.filter(i => i.duration).length || 1);
    
    return {
      totalIncidents,
      activeIncidents,
      resolutionRate: totalIncidents > 0 ? 
        ((totalIncidents - activeIncidents) / totalIncidents * 100).toFixed(1) : 0,
      avgResolution: avgResolution.toFixed(1)
    };
  }, [filteredData]);

  // Color palette for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Layout title="EMIM Dashboard" description="EMIM Incident Management Dashboard">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          EMIM Incident Dashboard
        </Typography>
        
        {/* KPI Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Total Incidents</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{kpis.totalIncidents}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={100} 
                  sx={{ mt: 1, height: 8, borderRadius: 4 }} 
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Active Incidents</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                  {kpis.activeIncidents}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(kpis.activeIncidents / kpis.totalIncidents) * 100 || 0} 
                  sx={{ mt: 1, height: 8, borderRadius: 4 }} 
                  color="error"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Resolution Rate</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                  {kpis.resolutionRate}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={kpis.resolutionRate} 
                  sx={{ mt: 1, height: 8, borderRadius: 4 }} 
                  color="success"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Avg. Resolution (hrs)</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{kpis.avgResolution}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(100, kpis.avgResolution * 10)} 
                  sx={{ mt: 1, height: 8, borderRadius: 4 }} 
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
          <CardHeader title="Filters" sx={{ bgcolor: '#f5f5f5' }} />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Time Range</InputLabel>
                  <Select
                    value={filters.timeRange}
                    onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                    label="Time Range"
                  >
                    <MenuItem value="all">All Time</MenuItem>
                    <MenuItem value="month">Last Month</MenuItem>
                    <MenuItem value="quarter">Last Quarter</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Bridge Type</InputLabel>
                  <Select
                    value={filters.bridgeType}
                    onChange={(e) => handleFilterChange('bridgeType', e.target.value)}
                    label="Bridge Type"
                  >
                    <MenuItem value="">All Types</MenuItem>
                    {filterOptions.bridgeTypes.map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Tech Platform</InputLabel>
                  <Select
                    value={filters.techPlatform}
                    onChange={(e) => handleFilterChange('techPlatform', e.target.value)}
                    label="Tech Platform"
                  >
                    <MenuItem value="">All Platforms</MenuItem>
                    {filterOptions.techPlatforms.map(platform => (
                      <MenuItem key={platform} value={platform}>{platform}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Severity</InputLabel>
                  <Select
                    value={filters.severity}
                    onChange={(e) => handleFilterChange('severity', e.target.value)}
                    label="Severity"
                  >
                    <MenuItem value="">All Severities</MenuItem>
                    {filterOptions.severities.map(severity => (
                      <MenuItem key={severity} value={severity}>{severity}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Resolving Group</InputLabel>
                  <Select
                    value={filters.resolvingGroup}
                    onChange={(e) => handleFilterChange('resolvingGroup', e.target.value)}
                    label="Resolving Group"
                  >
                    <MenuItem value="">All Groups</MenuItem>
                    {filterOptions.resolvingGroups.map(group => (
                      <MenuItem key={group} value={group}>{group}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setFilters({
                    timeRange: "all",
                    bridgeType: "",
                    techPlatform: "",
                    resolvingGroup: "",
                    severity: ""
                  })}
                  sx={{ height: '56px' }}
                >
                  Reset Filters
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Monthly Incidents */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
              <CardHeader title="Incidents by Month" />
              <CardContent sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="incidents" name="Incidents" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Incident Severity */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
              <CardHeader title="Incident Severity Distribution" />
              <CardContent sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.severityData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Resolution Time */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
              <CardHeader title="Avg. Resolution Time by Group (hours)" />
              <CardContent sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.resolutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="group" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avgHours" name="Hours" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Tech Platforms */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
              <CardHeader title="Top Tech Platforms" />
              <CardContent sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.platformData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Incidents" fill="#FF8042" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Data Table */}
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardHeader 
            title="Incident Details" 
            subheader={`Showing ${filteredData.length} records`}
            sx={{ bgcolor: '#f5f5f5' }} 
          />
          <CardContent>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>INC</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Duration (hrs)</TableCell>
                      <TableCell>Start Time</TableCell>
                      <TableCell>Resolving Group</TableCell>
                      <TableCell>Tech Platform</TableCell>
                      <TableCell>Severity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((row, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>
                          <a 
                            href={`https://incident-management/${row.INC}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                          >
                            {row.INC}
                          </a>
                        </TableCell>
                        <TableCell>{row.bridge_type}</TableCell>
                        <TableCell>
                          <Chip 
                            label={row.status} 
                            color={row.status === 'Active' ? 'error' : 'success'} 
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {row.duration !== null ? row.duration.toFixed(1) : 'N/A'}
                        </TableCell>
                        <TableCell>{row.bridge_start_time}</TableCell>
                        <TableCell>{row.lead_resolving_group || 'N/A'}</TableCell>
                        <TableCell>
                          {row.tech_platform ? (
                            row.tech_platform.split(';').slice(0, 2).map((platform, idx) => (
                              <Chip
                                key={idx}
                                label={platform.trim()}
                                size="small"
                                sx={{ m: 0.5 }}
                              />
                            ))
                          ) : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {row.impact_info && row.impact_info[0]?.severity ? (
                            <Chip 
                              label={row.impact_info[0].severity} 
                              size="small"
                              sx={{ 
                                backgroundColor: 
                                  row.impact_info[0].severity === 'Critical' ? '#d32f2f' :
                                  row.impact_info[0].severity === 'High' ? '#f57c00' :
                                  row.impact_info[0].severity === 'Medium' ? '#ffb300' : '#4caf50',
                                color: 'white'
                              }}
                            />
                          ) : 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
}

export default EMIMDashboard;