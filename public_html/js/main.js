

    Design
    Development
    Mobile
    Inspiration
    CSS
    Javascript

    Home
    Categories

    Follow Us

javascript /
Quick Tips: Using Videos as Backgrounds
September 17, 2013 at 4:46 pm By Mik Ted
background-videos
Download Demo

So you’ve seen videos being used as backgrounds across the web and you’re thinking ‘how do I do that?’. The main issue usually being making the video cover the entire screen. Normally when you set a video it will resize in accordance with its aspect ratio, meaning it won’t cover the entire background. Well don’t worry, for I am here to guide you on your enthralling quest towards background video freedom. Read on, young warrior.
Getting off the ground

First off, set up a div with the video you want as the background, and then have a content div for putting all the content. Don’t forget to take a screenshot of the video and save it as a jpg called poster.jpg. This will serve as a background for users who do not have browsers that support the video tag.

<div id="container">
	<video autoplay loop muted>
		<source src="video.mp4" type="video/mp4">
		<source src="video.webm" type="video/webm">
	</video>
	<div class="content">

	</div>
</div>

Next up, set up a bit of CSS to set the content to be positioned absolutely on top of the video:

#container {
	position: relative;
	overflow: hidden;
}

#container .content {
	position: absolute;
	top: 0;
	left: 0;
}

Great! Now all we gotta do is figure out how to make the video fit the entire screen. We have to use a bit of Javascript magic to make this work:
A little bit of Javascript

As discussed, the issue is that the video aspect ratio will make the video very difficult to cover the entire screen. How do we fix this? Well we need to make a comparison of the aspect ratio of the window against the aspect ratio of the video. Then we can multiply the width of the video by this calculation making the video always fill the screen, no matter what size the user’s screen is.

Don’t forget to include jQuery! Your code should look a bit like this:

$(function() {

	// IE detect
	function iedetect(v) {

	    var r = RegExp('msie' + (!isNaN(v) ? ('\\s' + v) : ''), 'i');
		return r.test(navigator.userAgent);

	}

	// For mobile screens, just show an image called 'poster.jpg'. Mobile
	// screens don't support autoplaying videos, or for IE.
	if(screen.width < 800 || iedetect(8) || iedetect(7) || 'ontouchstart' in window) {

		(adjSize = function() { // Create function called adjSize

			$width = $(window).width(); // Width of the screen
			$height = $(window).height(); // Height of the screen

			// Resize image accordingly
			$('#container').css({
				'background-image' : 'url(poster.jpg)',
				'background-size' : 'cover',
				'width' : $width+'px',
				'height' : $height+'px'
			});

			// Hide video
			$('video').hide();

		})(); // Run instantly

		// Run on resize too
		$(window).resize(adjSize);
	}
	else {

		// Wait until the video meta data has loaded
		$('#container video').on('loadedmetadata', function() {

			var $width, $height, // Width and height of screen
				$vidwidth = this.videoWidth, // Width of video (actual width)
				$vidheight = this.videoHeight, // Height of video (actual height)
				$aspectRatio = $vidwidth / $vidheight; // The ratio the video's height and width are in

			(adjSize = function() { // Create function called adjSize

				$width = $(window).width(); // Width of the screen
				$height = $(window).height(); // Height of the screen

				$boxRatio = $width / $height; // The ratio the screen is in

				$adjRatio = $aspectRatio / $boxRatio; // The ratio of the video divided by the screen size

				// Set the container to be the width and height of the screen
				$('#container').css({'width' : $width+'px', 'height' : $height+'px'});

				if($boxRatio < $aspectRatio) { // If the screen ratio is less than the aspect ratio..
					// Set the width of the video to the screen size multiplied by $adjRatio
					$vid = $('#container video').css({'width' : $width*$adjRatio+'px'});
				} else {
					// Else just set the video to the width of the screen/container
					$vid = $('#container video').css({'width' : $width+'px'});
				}

			})(); // Run function immediately

			// Run function also on window resize.
			$(window).resize(adjSize);

		});
	}

});

Now the video will cover the entire screen size on user resize or anything! Things to note:

    Mobiles dont support autoplayed videos, so we can't do this on mobile. Instead we'll show an image as a background called poster.jpg.
    Same goes for IE8 and below! For those browsers the poster.jpg image will be used instead.

Full screen background videos are really exploding on the web design scene, so I'm sure you'll find a use for it at some point. The footage I'm using is from Vimeo's free HD Stock Footage, so go check that out. Have a great day!
Related
xyzQuick Tips: CSS Click States without Javascript slideinSlide-in Backgrounds with jQuery! css-loadingMaking Awesome, Animated CSS3 Loading Bars with SVG Backgrounds 1234567Designing for Retina Display
Author

Mik Ted is the founder of InsertHTML and is passionate about all sorts of web design. He enjoys many things, including writing descriptions about himself in the third person.
Comments

    Breizhtic
    September 18, 2013 at 10:16 am

    I’m sorry, but it doesn’t seem to work on Opera, Firefox (no extensions) nor Chrome (latest versions).

    Works on IE10.
    Reply
        Johnny Simpson
        September 19, 2013 at 1:35 am

        Well it worked in Chrome, the reason it didn’t work in Firefox or Opera is because they don’t support mp4, so I uploaded webm alternatives. Sorry about that!
        Reply
            Mark
            November 27, 2013 at 5:05 pm

            This is a great tutorial thanks for putting this together! I’ve been playing around with this and even with the webm file in there it’s still not working in firefox for me. Am I missing something?
            Reply
            Jibograf
            May 7, 2014 at 3:46 pm

            Hi,

            Thanks for this tutorial.

            But in Safari and Firefox (first load it works), when I refresh, width and height of browser is not “injected” in the css… So my content doesn’t appear correctly… Can you have a solution to fix it ?
            Look over here : http://josso-palettes.com/wordpress

            Thanks a lot.
            Reply
                Johnny Simpson
                May 31, 2014 at 12:53 pm

                I’m not sure exactly what you’re referring to, when I run it in Firefox it seems to work alright.
                Reply
    Dave
    September 21, 2013 at 3:31 am

    Thanks for the quick tip. I’m wondering though how would you adjust the code so that the video played within a div with a width of 100% but a set height, rather than extending to the height of the entire window?
    Reply
    Adam
    October 2, 2013 at 5:26 pm

    This works and uses no JS http://kesilconsulting.com/web-designer-magazine/html-video-background-tutorial/#axzz2ZrkukABs
    Reply
    Rea
    January 29, 2014 at 8:57 am

    I very interested with this tips, but your demo does’t work on my Firefox. could you fix this tutorial?
    Reply
        Johnny Simpson
        February 2, 2014 at 1:54 pm

        It does work in Firefox.
        Reply
    Sam
    March 4, 2014 at 5:40 am

    This tutorial is fantastic. Thanks for sharing, Johnny!
    Reply
    Asif
    April 30, 2014 at 5:22 pm

    It doesn’t work on FF – tested with latest version
    Reply
        Johnny Simpson
        May 31, 2014 at 12:53 pm

        It works for me! I’m not sure which version of firefox you’re using.
        Reply
    Ahmed Yasser
    May 27, 2014 at 4:08 am

    Nice tutorial.. helped me alot.
    Reply
    Celso
    June 4, 2014 at 7:39 pm

    If I put a lot of text on the content div, it will not scroll. How may I accomplish a scroll.
    Thanks
    Reply

Leave a Reply

Name

Email

Website

Comment






Latest Tech News

    Android Users Locked Out of Mobile Devices by Ransomware
    Millions of Health Records Exposed in Excellus BlueCross BlueShield Hack
    GM's OnStar Hack Took Years to Fix
    Is Okta the Savior of Big Business Cybersecurity?
    Apple's iMessage Defense Hiccup

    Home
    Contact
    Twitter
    RSS
    Facebook
    About & Contributing Writers
    Privacy Policy

    Google Plus
    Design
    Development
    Inspiration
    Mobile

    CSS
    HTML
    Javascript

Hosted by
The Eighth, LLC | 282 Main St Ext C3, Middletown CT 06457

