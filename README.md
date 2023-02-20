# eye-ya!

**NOTE:** Almost all commits show up with megargayu's username as we used the Live Share extension in Visual Studio Code, meaning we both worked on the same computer and therefore the same account.

# Summary
Our app, Eye-ya!, allows you to take care of your eyes through Machine
Learning. This is done through Focus Mode,
where once you start a session, the app will automagically track your
eyes, making sure you are blinking enough and aren't getting drowsy.
Alternatively, you can check out some eye exercises.

## The Problem
In today's day and age, we are always on our screens, whether it be for
work, play, or even just checking the time. And [numerous](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6020759/)
[studies](https://americanrefractivesurgerycouncil.org/digital-device-use-eyes/)
have linked this excess of screen time to eye strain and dry eyes, to
the point where there is a condition named [Computer Vision Syndrome](https://www.aoa.org/healthy-eyes/eye-and-vision-conditions/computer-vision-syndrome?sso=y)
which refers to the "eye discomfort and vision problems when viewing
digital screens for extended periods" (American Optometric Association).

## Our Solution - Eye-ya!
The main problem with this excess of focus is that you tend to blink
less, causing your eye to dry out ([Australian Government](https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/eyes-common-problems))
That's why we decided to use Machine Learning to track your eyelids,
detecting how many times you blink and how drowsy you are at any given
time, prompting the user to take breaks if necessary. We also provide
eye exercises, and prompt the user to use them about every 30 minutes,
to make sure their eyes are not focusing on one point for a prolonged
period of time.

## Who is it For?
As developers, we have this same problem - often, we get too absorbed in
a task, forgetting to take a break or focusing too hard on the screen.
In fact, we often found ourselves experiencing CVS during this
hackathon!  
That's why we felt that we needed to create an app that would not only
tell us to take breaks, but to also track whether our eyes are
straining, and to prevent it from happening.  
Nonetheless, Eye-ya is for everyone - whether you are a developer,
artist, or just the average teenager. These days, everyone is looking at
a screen, and since Eye-ya! can be used on both desktop and mobile, we
hope that users of all kinds will benefit from our app.

## How does it work?
Eye-ya uses machine learning to detect facial landmarks. Using these
landmarks, it calculates the EAR (Ear Aspect Ratio); low values of the
EAR correspond to blinking.

## Making the App

### Our Journey
Along the way, we faced several challenges. First, we had to figure out
how to perform blink detection. After much research we found [a paper](http://vision.fe.uni-lj.si/cvww2016/proceedings/papers/05.pdf)
on the EAR method as well as several examples - however, most of these
were written in Python, which meant we had to figure out how to rewrite
them in Javascript for the maximum reach and ease of use possible. We
also had to carefully consider which libraries and models to use,
balancing useful functionality with unnessesary features, as we wanted
to deliver a useful service but not consume too many resources.

### Tech Stack
Eye-ya uses React for UI and [tensorflow.js](https://js.tensorflow.org/index.html)
to find facial landmarks, in order to detect blinking and drowsiness. We
also used Tailwind CSS for styling, Vite for bundling and Yarn for
package management.

### Future Plans
We deeply believe in the potential of our project - it is simple to use,
while still having a real world impact. As such, we have many plans for
growth.
+ First, we want to add even more functionality to Eye-ya. Some examples include more educational sections, more comprehensive detection, and ease of life features.
+ We also want to make a browser extension for Eye-ya. This way it will
be even more convenient to use, as Eye-ya! will be able to keep track
of their eyes in the background.

## Privacy
All computation (recording video, running the model, detecting blinking)
happens in the browser, and nothing is ever sent to an external server!