---
layout: post
current: post
cover: assets/images/gsoc-mentor-summit-2026-cover.png
navigation: True
title: "From a rejected applicant to the Mentor Summit: Wikimedia at Google Summer of Code 2026"
date: 2026/11/18
tags: oss wikimedia gsoc
class: post-template
subclass: "post tag-wikimedia"
author: Gopa-Vasanth
---

*Originally published on [Diff](https://diff.wikimedia.org/2026/11/18/from-a-rejected-applicant-to-the-mentor-summit-wikimedia-at-google-summer-of-code-2026/), the Wikimedia community blog.*

In 2018, I applied to Google Summer of Code but wasn't selected. The next year I reapplied and got selected as a GSoC contributor. I then continued my role as a contributor and mentor and now I have gone on to be Wikimedia's organisation administrator and then I have represented Wikimedia at GSoC Mentor Summit.

My first summit experience was in 2023, and after some change of plans I had the privilege of returning to my second in Munich, Germany. From 30 October – 1 November 2026, I joined Sarthak Parashar as one of two representatives to meet mentors and org admins of more than 100 open source communities.

All below is a summary of what we discussed, what other communities are facing and what I think should be brought back to Wikimedia.

## An event with no fixed agenda

This is unlike any conference. As a full unconference, there isn't a set programme in advance. Any mentor or org admin can submit a session by adding a sticky note to the schedule board and the rest of us choose what sessions to attend. We filled the entire schedule by the first morning, which shows what's currently on people's minds.

<p style="text-align:center"><img src="assets/images/gsoc-mentor-summit-2026-board.jpeg" alt="The unconference schedule board, covered in sticky notes" style="max-width:320px;width:100%"></p><center>Fig: The unconference schedule board, covered in sticky notes.</center>

This meant we were in the same space as people from VLC, FOSSASIA, Jde Robot, Django, Anki Droid, AOSSIE, OSgeo, Kubeflow, BRL-CAD and far too many others. The best discussions by far were about implementation: the way that each community picks out contributors, mentors them over the summer, reviews projects and assesses submissions. Every community does things differently and that was the most useful part of the weekend for me.

![Mentors in discussion between sessions](assets/images/gsoc-mentor-summit-2026-discussion.png)<center>Fig: Mentors in discussion between sessions.</center>

## Most of the rooms question: AI

Throughout the summit, AI was the topic that kept coming up, even in sessions that were about something else. A few questions came up repeatedly:

- Volume. Several organisations noticed a big increase in applications this year. Many were well-written but generic, making it harder to identify applicants who had genuinely understood the project and put in the effort.
- Who are you talking to? More than one mentor commented that some communication with the applicants came across more like an agent speaking to you rather than a person.
- Learn or outsource? The open question isn't whether contributors use AI tools but how: to learn a code base more quickly; to create code they don't understand; or to become a true community member.

Nobody claimed to have figured it out. But everyone seemed to agree that what makes the programme valuable is the human connection: a mentor and a newcomer working together to solve real problems.

It was interesting to compare this with my first summit in 2023, at Google's headquarters in California. I gave a short presentation about Wikimedia's outreach programmes, and what stayed with me most was the opportunity to connect and collaborate with other open source organisations and Google. Looking back at what I wrote after that trip, AI barely came up. Three years later, it was a topic in almost every room.

## Good code is not enough

One thing that came up over and over was that: Organisations don't want to hire someone with great code who hasn't engaged with the community. Coming to the issue tracker, showing up in the public channels, helping out with other people's patches, and sticking around after the summer are just as important as a good proposal. For Wikimedia, where the future of our tech community depends on our ability to retain people, it was familiar.

I also heard about mentors supporting more than four projects at once this year. It really shows how dedicated open source mentors are, but also how stretched some organisations can be.

## Presenting Wikimedia

I gave a short presentation on the Wikimedia Foundation's long history with Google Summer of Code and some of the projects our contributors completed this summer:

- Gamifying constraint violation fixes on Wikidata – Egezort
- Implement lossless JPG transformations in the Commons Android App – Rishan
- Wikifile-Transfer Enhancement – Anirudh Bharatiya

![Presenting Wikimedia's GSoC work at the summit](assets/images/gsoc-mentor-summit-2026-presenting.png)<center>Fig: Presenting Wikimedia's GSoC work at the summit.</center>

## How I got here

This trip is a (long) ride for me. I applied to GSoC in 2018 but did not get in. The next year I applied again and got in to finish GSoC as a contributor in 2019. I then mentored in Google Code-in, mentored contributors in GSoC itself, and have been an org-admin supporting Wikimedia's presence at outreach programs since 2021, have been org admin for GSoC & Outreachy, and attended my first Mentor Summit in California in 2023. Munich was my second Mentor Summit.

I am not unusual in this. Looking around the room, I was amazed to realise how many people had travelled a similar path. We were once newcomers trying to get our first contribution merged and now we were helping others take their first steps into open source. That cycle is what the programme is really for.

## Beyond the sessions

Some of the most meaningful conversations took place outside the session rooms. Everyone attends open source projects for various reasons; passion, career growth, curiosity, or because they genuinely enjoy it. Sharing those reasons and getting to know Munich with folks I'd only had the opportunity to meet just a few days, I felt like the summit was less of a conference and more like a gathering of the people I'd never met.

![Discovering Munich with some new friends from the Summit](assets/images/gsoc-mentor-summit-2026-munich.jpeg)<center>Fig: Discovering Munich with some new friends from the Summit.</center>

## What I am taking back to Wikimedia

The scale of the challenge is clear from Google's own numbers. This year, organisations reviewed a record [23,371 proposals from 15,245 applicants](https://opensource.googleblog.com/2026/04/the-journey-begins-meet-the-2026-gsoc-contributors.html) for 1,141 contributor slots, roughly 20 proposals for every slot. Here is what I want to bring back to our own programme.

- **Share an AI policy for the application stage – not just the code.** Our [contributor guide](https://www.mediawiki.org/wiki/Mentorship_programs/Possible_projects) now states that you have to be able to explain any AI-assisted code you submit and we ask about AI use in commits. Other orgs have been more direct: Rust asks applicants [not to use AI to write proposal text](https://gsoc-explorer.vercel.app/ideas/the-rust-foundation/blob-main-gsoc-readme), Wagtail asks for [a disclaimer on any AI-assisted proposal](https://gsoc-explorer.vercel.app/ideas/wagtail/ai-policy), and VideoLAN [prohibits any AI-generated content](https://mailman.videolan.org/pipermail/vlc-devel/2026-March/143864.html) at all in GSoC. We don't have to copy any of them, but applicants deserve a clear answer from us before they apply.
- **Make community participation the main signal.** Polished submissions are increasingly common. Weeks of actual interaction are much harder to simulate: questions in Phabricator and Zulip, volunteer patches going to review and into production, open discussion of these patches. OpenStreetMap, for example, now says outright that [typo fixes and fully AI-generated pull requests](https://wiki.openstreetmap.org/wiki/Google_Summer_of_Code/2026) will not count as qualifying contributions. I'd like our mentors to place greater value on that engagement than on the proposal.
- **Have a quick live chat before making your selection.** Many mentors described discussions that seemed more like talking to agents, and a few organisations have said they might request a quick [video walk-through](https://forums.synfig.org/t/google-summer-of-code-2026/16911?page=2) for proposals. 15-minute calls or recorded walkthroughs would say so much more than another page of text.

## A lasting takeaway

To me, the Mentor Summit was an experience that reminded me that GSoC isn't just about finishing a project in the summer. It's about the people we meet, the community we join, and those who will then return as mentors in a few years. I'm glad I've had a chance to be a part of that process not just in Wikimedia, but in the larger open source community.

## Thank you

Thanks to the Google Open Source team for running the summit and providing travel funds for the mentors, and thanks to each Wikimedia mentor and contributor for giving us an opportunity to showcase your work. If you'd like to mentor Wikimedia through GSoC or Outreachy again next year, we'd love for you to contact any of our org admins: [Lani Goto](https://meta.wikimedia.org/wiki/User:LGoto_(WMF)), [Gopa Vasanth](https://www.mediawiki.org/wiki/User:Gopavasanth), [Mahfuza Mohona](https://www.mediawiki.org/wiki/User:Mhmohona), and [Osuolale Marv](https://www.mediawiki.org/wiki/User:Stormy_Chamber).

*Photos: Gopavasanth, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).*
