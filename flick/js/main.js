//
// Main.js
//

/* ------------------------------------------------------------------
 * Name         : Wicko - HTML Template
 * File         : main.js
 * Author       : ScanThemes
 * Author URI   : scanthemes@gmail.com
 *
 * All Rights Reserved.
 * --------------------------------------------------------------------- */
/* ---------------------------------------------------------------------

  [Table of contents]

    - Default options
    - Google Map (Init)
    - Preloader
    - Contact form
    - Scroll To Element
    - Plugins load
    - Google Map
    - Off-Canvas
    - Navbar Affix
    - Modal Window Video (Bootstrap)
    - Carousel (Bootstrap)
    - Progress Bar Animate
    - Carousel + animation
    - Partially collapsing sidebar
    - Collapser

------------------------------------------------------------------------ */
/*---------------------------------------------------------------------- */

//------------------- Default options -------------------
if ( ( options == undefined ) || ( options == false ) ) {
  var options = true,
      preloader = { enabled : false },
      GoogleMapAPI = { 
        key : '',
        language : '',
        region : '',
        disableDefaultUI : false,
        markerIcon: '',
        customMapStyle: ''
      },
      scrollToElement = { scrollSpeed : 700 },
      slider = { interval : 5000 };
}

//----------------------- Init Map ------------------------
function initMap() {
    var map_item = document.querySelectorAll('[data-map]');
    Array.prototype.forEach.call(map_item, function(el) {
        var GM_lat = -34.400,
            GM_lng = 150.9,
            GM_zoom = 8,
            GM_disableDefaultUI = GoogleMapAPI.disableDefaultUI,
            GM_marker_lat = -34.400,
            GM_marker_lng = 150.9,
            GM_marker_title = 'Marker title',
            GM_marker_icon = GoogleMapAPI.markerIcon,
            GM_marker_animation = false,
            GM_marker_label = '',
            GM_marker_content = '',
            GM_style,
            map;

    if ( (el.closest('[data-lat]')) && (el.closest('[data-lng]')) ) {
      GM_lat = Number(el.getAttribute('data-lat'));
      GM_lng = Number(el.getAttribute('data-lng'));
      GM_zoom = Number(el.getAttribute('data-zoom'));
    }
    if ( el.closest('[data-zoom]') ) {
      GM_zoom = Number(el.getAttribute('data-zoom'));
    }
    if ( (el.closest('[data-marker-lat]')) && (el.closest('[data-marker-lng]')) ) {
      GM_marker_lat = Number(el.getAttribute('data-marker-lat'));
      GM_marker_lng = Number(el.getAttribute('data-marker-lng'));
    }
    if ( el.closest('[data-marker-title]') ) {
      GM_marker_title = el.getAttribute('data-marker-title');
    }
    if ( el.closest('[data-marker-animation="drop"]') ) {
      GM_marker_animation = google.maps.Animation.DROP;
    }
    if ( el.closest('[data-marker-animation="bounce"]') ) {
      GM_marker_animation = google.maps.Animation.BOUNCE;
    }
    if ( el.closest('[data-marker-label]') ) {
      GM_marker_label = el.getAttribute('data-marker-label');
    }
    if ( el.closest('[data-marker-icon]') ) {
      GM_marker_icon = el.getAttribute('data-marker-icon');
    }
    if ( el.closest('[data-marker-content]') ) {
      GM_marker_content = el.getAttribute('data-marker-content');
    }
    if ( el.closest('[data-map-style="light"]') ) {
      GM_style = 
        [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ]
    } else if ( el.closest('[data-map-style="dark"]') ) {
      GM_style = 
        [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#181818"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1b1b1b"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#2c2c2c"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8a8a8a"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#373737"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#3c3c3c"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#4e4e4e"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#3d3d3d"
              }
            ]
          }
        ]
    } else if ( el.closest('[data-map-style="custom"]') ) {
      GM_style = GoogleMapAPI.customMapStyle
    }

    map = new google.maps.Map(el, {
      styles: GM_style,
      center: {lat: GM_lat, lng: GM_lng},
      zoom: GM_zoom,
      disableDefaultUI: GM_disableDefaultUI
    });
    var marker = new google.maps.Marker({
        position: {lat: GM_marker_lat, lng: GM_marker_lng},
        map: map,
        animation: GM_marker_animation,
        title: GM_marker_title,
        label: GM_marker_label,
        icon: GM_marker_icon
    });
    if ( GM_marker_content ) {
      var infowindow = new google.maps.InfoWindow({
          content: GM_marker_content
      });
      marker.addListener('click', function() {
          infowindow.open(map, marker);
      });
    }
  });
}

(function($) {

    "use strict";

    //--------------------- Preloader ----------------------
    if ( preloader.enabled == true ) {
        var preloaderBody = document.querySelector('body'),
            preloaderWrapper = document.createElement('div');
        if (preloaderBody.classList) {
            preloaderBody.classList.add("preloader");
        } else {
            preloaderBody.className += ' ' + "preloader";
        }
        if (preloaderWrapper.classList) {
            preloaderWrapper.classList.add("preloaderWrapper");
        } else {
            preloaderWrapper.className += ' ' + "preloaderWrapper";
        }
        document.body.appendChild( preloaderWrapper );
        document.body.onload = function(){
            $('.preloaderWrapper').fadeOut();
            $('body').removeClass('preloader');
        }
    }

    //---------------- Contact form --------------
    if($('[data-form="contact_form"]').length) {
        var form = $('[data-form="contact_form"]'),
            alert_message = '<div class="alert alert-round" role="alert" data-alert="result" style="display: none;">',
            form_data,
            SDresult;
        form.prepend(alert_message);
        SDresult = $('[data-alert="result"]');
        // Success function
        function sending_done(response) {
            SDresult.fadeIn().removeClass('alert-danger').addClass('alert-success');
            SDresult.text(response);
            form.find('input:not([type="submit"]), textarea').val('');
        }
        // Fail function
        function sending_fail(data) {
            SDresult.fadeIn().removeClass('alert-success').addClass('alert-danger');
            SDresult.text(data.responseText);
        }
        form.submit(function (e) {
            e.preventDefault();
            form_data = $(this).serialize();
            $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: form_data
            })
            .done(sending_done)
            .fail(sending_fail);
        });
    }

    //------------ Scroll To Element ------------
    $('a[data-scroll^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('data-scroll')),
            navbar_height = -1;
        if ($('.navbar.fixed-top').length) {
          navbar_height = $('.navbar.fixed-top').outerHeight() - 1;
        }
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - navbar_height
            },  scrollToElement.scrollSpeed);
        }
    });
    var isInViewport = function (elem) {
      var distance = elem.getBoundingClientRect();
      if ((window.innerHeight || document.documentElement.clientHeight) > distance.height) {
        return (
          distance.top >= 0 &&
          distance.left >= 0 &&
          distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          distance.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      } else {
        const vEOS = (distance.height - (window.innerHeight || document.documentElement.clientHeight) + (distance.height*10/100));
        return (
          distance.top >= 0 &&
          distance.left >= 0 &&
          distance.bottom - (vEOS) <= (window.innerHeight || document.documentElement.clientHeight) &&
          distance.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }
    };
    var navbar_l = document.querySelectorAll('.navbar .navbar-nav .nav-link[data-scroll]');
    window.addEventListener('scroll', function (event) {
      Array.prototype.forEach.call(navbar_l, function(navIDS) {
        const navSTE_link = document.querySelector(navIDS.getAttribute('data-scroll'));
        if (isInViewport(navSTE_link)) {
          [].forEach.call(navbar_l, function(navMSL) {
            if (navMSL.classList) {
              navMSL.classList.remove('active');
            } else {
              navMSL.active = navMSL.active.replace(new RegExp('(^|\\b)' + active.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
          });
          navIDS.classList.add('active');
        }
      });
    }, false);

    //------------------------ Plugins load ----------------------------- 
    var _mainJS = document.querySelector('#_mainJS[data-plugins="load"]');

    if ( _mainJS ) {

        // Parallax
        if ( document.querySelector('[data-parallax]') ) {
            var parallax_js = document.createElement("script");
            parallax_js.src = 'assets/plugins/parallax/parallax.js';
            document.body.insertBefore(parallax_js, _mainJS);
        }

    }

  //----------- Google Map ----------
  if ( document.querySelector('[data-map]') ) { 
    var GM_item = document.querySelector('[data-map]'),
        GM_map  = document.createElement("script"),
        GM_api  = 'https://maps.googleapis.com/maps/api/js?key=',
        GM_key  =  GoogleMapAPI.key,
        GM_init = '&callback=initMap',
        GM_lang = GoogleMapAPI.language,
        GM_reg  = GoogleMapAPI.region,
        GM_src;
    if (GM_lang) {
        GM_lang = '&language=' + GM_lang;
    }
    if (GM_reg) {
        GM_reg = '&region=' + GM_reg;
    }
    GM_src = GM_api + GM_key + GM_init + GM_lang + GM_reg;
    GM_map.src = GM_src;
    document.body.insertBefore( GM_map, _mainJS);
  }

  //------------- Off-Canvas ---------------
  $('[data-toggle="offcanvas"]').on('click', function(e) {
      e.preventDefault();
      var offcanvas_target = $(this).data("target");
      if ($(offcanvas_target).is('.show')) {
          $(offcanvas_target).addClass("showing").delay(300).queue(function(next){
              $(this).removeClass("showing");
              next();
          });
          $(offcanvas_target).removeClass('show');
          $('.overlay-offcanvas').remove();
      } else {
          $(offcanvas_target).addClass("showing").delay(300).queue(function(next){
              $(this).removeClass("showing");
              next();
          });
          $(offcanvas_target).addClass('show');
          $('<div data-offcanvas-overlay="' + offcanvas_target + '-overlay" class="overlay-offcanvas"></div>').insertBefore(offcanvas_target);
      }
  });

  /* offcanvas-close */
  $('[data-toggle="offcanvas-close"]').on('click', function() {
      var offcanvas_close_item = $(this).closest('[class*="offcanvas"]').attr('id'),
          offcanvas_close_overlay = ( '#' + offcanvas_close_item + '-overlay' );
      $( '#' + offcanvas_close_item + '.show' ).addClass("showing").delay(300).queue(function(next){
          $(this).removeClass("showing");
          next();
      });
      $( '#' + offcanvas_close_item + '.show' ).removeClass('show');
      $( '[data-offcanvas-overlay="' + offcanvas_close_overlay + '"]').remove();
  });

  /* offcanvas-overlay */
  $(document).on('click', '[data-offcanvas-overlay]', function() {
      var offcanvas_overlay_item = $(this).next('.offcanvas, .offcanvas-sm, .offcanvas-md, .offcanvas-lg, .offcanvas-xl');
      $( offcanvas_overlay_item ).addClass("showing").delay(300).queue(function(next){
          $(this).removeClass("showing");
          next();
      });
      $(offcanvas_overlay_item).removeClass('show');
      $(this).remove();
  });

  //----------- Navbar Affix -----------------
  let affiXposition = $(window).scrollTop();
  if(affiXposition > 60) {
    $('.navbar-affix').addClass('affix');
  }
  $(window).on('scroll', function (event) {
      var scrollValue = $(window).scrollTop();
      if (scrollValue > 60) {
          $('.navbar-affix').addClass('affix');
      } else {
          $('.navbar-affix').removeClass('affix');
      }
  });

  //----------- Modal Window Video (Bootstrap) ----------- 
  $('[data-modal-video="play"]').on('click', function () {
      var theModal = $(this).data("target"),
      videoSRC = $(this).attr("data-video"),
      videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
      $(theModal + ' iframe').attr('src', videoSRCauto);
      $(theModal + ' button.close').on('click', function () {
          $(theModal + ' iframe').attr('src', videoSRC);
      });
      $(theModal).on('hidden.bs.modal', function (e) {
        $(theModal + ' iframe').attr('src', videoSRC);
      });
  });

  //----------- Carousel (Bootstrap) -----------
  $('#slider_fade').carousel({
      interval: slider.interval // set interval
  });

  //----------- Progress Bar Animate ---------------
  function progressbar_animate() {
      $('.progress .progress-bar').css("width",
          function() {
              return $(this).attr("aria-valuenow") + "%";
          }
      );
  }

  //------------ Carousel + animation -------------
  $('.carousel [data-slide]').on('click', function () {
    $('.carousel-inner .carousel-item').find('[data-carousel-animation]').removeClass('active');
    $('.carousel-inner .carousel-item.active').find('[data-carousel-animation]').addClass('active');
  });

  //-------------------- Partially collapsing sidebar -------------------
  $('[data-collapsing="partially"]').on('click', function () {
      var p_collapsing_item = $(this).attr('data-collapsing-target');
      if($(p_collapsing_item).is('.p-collapse')) {
        $(p_collapsing_item).removeClass('p-collapse');
      } else {
        $(p_collapsing_item).addClass('p-collapse');
      }
  });

  //------------------------- Collapser -----------------------------
  $('.collapser').on('click', function() {
      if($(this).is('.collapser-active')) {
        $(this).removeClass('collapser-active');
      } else {
        $(this).addClass('collapser-active');
      }
      $(this).next().collapse('toggle');
  });

  //------------------------- Tooltip -------------------------------
  $('[data-toggle="tooltip"]').tooltip();

  //------------------------- Password Toggle -----------------------
  $('.control-label-PV').on('click', function() {
    let input_PV = document.querySelectorAll('.input_PV');
    Array.prototype.forEach.call(input_PV, function(el) {
      if (el.type === "password") {
        el.type = "text";
      } else {
        el.type = "password";
      }
    });
  });

  //------------------------- Password Confirm -----------------------
  $('.password__input, .password_conf__input').on('input', function() {
    if($('.password__input').val() == $('.password_conf__input').val()) {
      $('.password_conf__icon').css('visibility', 'visible');
      $('.password_conf-group').css('border-color', '#e9ecef');
    } else {
      $('.password_conf__icon').css('visibility', 'hidden');
      $('.password_conf-group').css('border-color', '#d62662');
    }
  });

})( jQuery );
