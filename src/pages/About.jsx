const Link = ({ children, href }) => (
  <a href={href} className="text-blue-400 underline">
    {children}
  </a>
);

const About = () => {
  return (
    <div className="w-full px-10 text-white overflow-y-scroll h-[calc(100%-6rem)]">
      <h1 className="text-3xl mb-2 mt-5">The Problem</h1>
      <p>
        In today's day and age, we are always on our screens, whether it be for
        work, play, or even just checking the time. And{" "}
        <Link href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6020759/">
          numerous
        </Link>{" "}
        <Link href="https://americanrefractivesurgerycouncil.org/digital-device-use-eyes/">
          studies
        </Link>{" "}
        have linked this excess of screen time to eye strain and dry eyes, to
        the point where there is a condition named{" "}
        <Link
          href={
            "https://www.aoa.org/healthy-eyes/eye-and-vision-conditions/computer-vision-syndrome?sso=y"
          }
        >
          Computer Vision Syndrome (CVS)
        </Link>{" "}
        which refers to the "eye discomfort and vision problems when viewing
        digital screens for extended periods" (American Optometric Association).
      </p>
      <h1 className="text-3xl mb-2 mt-5">
        What is Eye-ya!, and how does it work?
      </h1>
      <p>
        The main problem with this excess of focus is that you tend to blink
        less, causing your eye to dry out (
        <Link href="https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/eyes-common-problems">
          The Austrialian Government's BetterHealth Channel
        </Link>
        ). That's why we decided to use Machine Learning to track your eyelids,
        detecting how many times you blink and how drowsy you are at any given
        time, prompting the user to take breaks if necessary. We also provide
        eye exercises, and prompt the user to use them about every 30 minutes,
        to make sure their eyes are not focusing on one point for a prolonged
        period of time.
      </p>
      <h1 className="text-3xl mb-2 mt-5">Who is it For? / Inspiration</h1>
      <p>
        As developers, we have this same problem - often, we get too absorbed in
        a task, forgetting to take a break or focusing too hard on the screen.
        In fact, we often found ourselves experiencing CVS during this
        hackathon!
        <br />
        <br />
        That's why we felt that we needed to create an app that would not only
        tell us to take breaks, but to also track whether our eyes are
        straining, and to prevent it from happening.
        <br />
        <br />
        Nonetheless, Eye-ya is for everyone - whether you are a developer,
        artist, or even just a normal teenager. These days, everyone is looking
        at a screen, and since Eye-ya! can be used on both desktop and mobile,
        we hope that users of all kinds will benefit from our app.
      </p>
      <h1 className="text-3xl mb-2 mt-5">Making the App</h1>
      <h2 className="text-2xl mb-2 mt-2">Tech Stack</h2>
      <p>
        Eye-ya uses React for UI and{" "}
        <Link href="https://js.tensorflow.org/index.html">tensorflow.js</Link>{" "}
        to detect facial landmarks and using those to calculate the EAR (Eye
        Aspect Ratio), using it to calculate whether the user is blinking or is
        drowsy. We also used tailwindcss for the css and Vite for packaging.
      </p>
      <h2 className="text-2xl mb-2 mt-2">Our Journey</h2>
      <p>
        Along the way, we faced several challenges. First, we had to figure out
        how to perform blink detection, and after copious research we found{" "}
        <Link href="http://vision.fe.uni-lj.si/cvww2016/proceedings/papers/05.pdf">
          a paper
        </Link>{" "}
        on the EAR method, as well as several examples. However, most of these
        were written in Python, which meant we had to figure out how to rewrite them 
        in Javascript for the maximum reach and ease of use possible. 
        We also had to carefully consider which libraries and models to use, balancing useful 
        functionality with unnessesary features, as we
        wanted to deliver a useful service but not consume too many resources.
      </p>
      <h2 className="text-2xl mb-2 mt-2">Future Plans</h2>
      <p>
        We deeply believe in the potential of our project - it is simple to use,
        while still having a real world impact. As such, we have many plans for
        growth.
      </p>
      <ol className="list-decimal ml-10">
        <li>
          First, we want to add even more functionality to Eye-ya. Some examples
          include more educational sections, more comprehensive detection, and ease of 
          life features.
        </li>
        <li>
          We also want to make a browser extension for Eye-ya. This way it will
          be even more convenient to use, as Eye-ya! will be able to keep track of their 
          eyes in the background.
        </li>
      </ol>

      <h1 className="text-3xl mb-2 mt-5">Privacy</h1>
      <p>
        All computation (recording video, running the model, detecting blinking)
        happens in the browser, and nothing is ever sent to an external server!
      </p>
    </div>
  );
};

export default About;
