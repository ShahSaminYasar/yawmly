import Footer from "@/components/common/Footer";
import Image from "next/image";
import Link from "next/link";
import { GoHome } from "react-icons/go";

export const metadata = {
  title: "Devlog | Yawmly",
  description:
    "Devlog of Yawmly — a PWA built for daily planning, session tracking, and focused productivity. From idea to release in 5 days.",
};

const page = () => {
  return (
    <>
      <section className="max-w-4xl mx-auto px-6 py-8 text-sm sm:text-lg font-normal text-slate-700 text-justify fade">
        <Link
          href={"/"}
          className="text-slate-500 text-xs sm:text-sm font-normal w-fit flex items-center gap-2 p-2 rounded-lg border-[1px] border-slate-500 -mt-6"
        >
          <GoHome className="text-sm sm:text-lg" />
          Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-[#ff6302]">
          Yawmly - Productivity, daily.
        </h1>
        <Image
          className="block w-full max-w-md mx-auto h-auto mb-6"
          src="/logo.png"
          alt="Yawmly - Productivity, daily."
          width={1024}
          height={1024}
        />

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">📌 Current Version</h3>
          <p>V1.1.2</p>
          <p className="mt-2">Version release date: 17 April, 2025</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">📅 Dates Noted</h3>
          <p>Development started: 8 April, 2025</p>
          <p className="mt-2">Stable version ready: 13 April, 2025</p>
        </div>

        <hr className="my-8" />

        {/* Backstory */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-left">✍ Backstory</h2>
          <p>
            <strong>Yawmly</strong> began from a personal need — I wanted a
            clean, distraction-free way to plan my days, track productivity, and
            reflect. No overcomplicated dashboards or bloated to-do lists — just
            something lightweight, intuitive, and personal.
          </p>
          <p className="mt-4">
            Initially, I had been away from studying for quite some time. But as
            my exams approached, I knew I had to refocus. I’ve always used study
            timer apps to track my sessions, and while trying to get back into
            the rhythm, I noticed something important — studying in shorter,
            planned sessions felt much more effective than long, continuous
            ones. For example, if I aimed to study for 7 hours straight, I often
            couldn’t reach that goal. But when I broke it down into smaller
            1-hour sessions and spread them out throughout the day, it became
            much easier to manage. The 7 hours got done without even feeling
            overwhelming. With this in mind, I started planning my days on
            paper, dividing them into focused study sessions. Then, I made a
            planner in Canva with a simple table — rows like "Study", "Break",
            etc. I saved it as a PDF file and edited it daily, marking sessions
            as done or writing TODOs. But soon, editing the PDF became tedious.
            Annotation on the newer browsers was clunky, I didn’t want to
            install extra PDF tools, and sharing between devices was a hassle —
            screenshotting, sending files, downloading them… it all defeated the
            purpose of being productive.
          </p>
          <p className="mt-4">
            That’s when the idea hit: “Why not build a small web app that shows
            a table and lets me add remarks and notes easily?” But exams were
            near, so I pushed the idea aside.
          </p>
          <p className="mt-4">
            Still, the thought kept growing and started distracting me from
            studies. Finally, on 8 April 2025, I gave in — told myself, "NOT
            more than 2 days, finish it." I closed the books and got into the
            zone. Of course, it took more than 2 days. I released the stable
            version in the early hours of 13 April 2025 — around 1:56 AM to be
            exact. But I have no regrets. `Yawmly` turned out far better than I
            planned and imagined. It was worth every sleepless night.
          </p>
        </div>

        <hr className="my-8" />

        {/* Initial Plan */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-left">💡 Initial Plan</h2>
          <p>
            From the beginning, I wanted Yawmly to be a PWA (Progressive Web
            App) — fast, offline-ready, and flexible. The core idea was to let
            anyone start planning right away, even without an account. For
            students who prefer staying offline to avoid distractions, this was
            essential.
          </p>
          <p className="mt-4">
            So the idea of anonymous onboarding came up — use the app locally
            first, and later connect your Google account or register if you want
            to save your data online. No pressure, just options.
          </p>
        </div>

        <hr className="my-8" />

        {/* Naming */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-left">🍃 Naming</h2>
          <p>
            “Yawm” means “day” in Arabic. Combined with the suffix “-ly” (as in
            “daily”), the name “Yawmly” was born.
          </p>
        </div>

        <hr className="my-8" />

        {/* Pages */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-left">📄 Pages</h2>
          <ul className="list-disc ml-6">
            <li className="mt-3">
              <strong>Welcome</strong>: A welcoming place where new users are
              introduced to the app, and returning users can resume their flow.
            </li>
            <li className="mt-3">
              <strong>Home</strong>: The main workspace where daily tasks are
              planned. Sessions can be added with time blocks, remarks, tags,
              and start-stop tracking.
            </li>
            <li className="mt-3">
              <strong>Plans</strong>: All the plans can be managed from this
              page.
            </li>
            <li className="mt-3">
              <strong>D-Days</strong>: All D-Days can be viewed and managed from
              this page.
            </li>
            <li className="mt-3">
              <strong>Settings</strong>: Includes the user settings - day start
              time, time format, session tags and their individual properties.
            </li>
            <li className="mt-3">
              <strong>Account</strong>:From here, users can register, log in, or
              connect their account to Google. Logged in users can view info
              related to their account.
            </li>
          </ul>

          <p className="mt-4">
            All pages are designed to feel snappy, clean, and distraction-free,
            with most actions happening through modals and without page reloads.
          </p>
        </div>

        <hr className="my-8" />

        {/* Features */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-left">✨ Features</h2>
          <ul className="list-disc ml-6">
            <li className="mt-4">
              <strong>Plans</strong>: Users can create and manage multiple
              plans. The selected primary plan is always displayed on the home
              screen. Each plan is structured in three columns:
              <ol
                style={{
                  listStyle: "lower-roman",
                  marginLeft: "20px",
                }}
              >
                <li>Session time and duration</li>
                <li>Session name</li>
                <li>Remarks (status and notes)</li>
              </ol>
              Each row is called a `Session Block`. These blocks are colored
              based on their respective tags, which are fully customizable —
              users can set tag names and assign unique colors to each tag for
              better visual clarity.
            </li>
            <li className="mt-4">
              <strong>D-Days</strong>: Users can mark important dates (exams,
              events, etc.) on the calendar, and the number of days remaining to
              each date is shown as a `D-Day card`. The home screen header shows
              the countdown to the user's selected primary D-Day.
            </li>
            <li className="mt-4">
              <strong>Offline Capability</strong>: Yawmly is a PWA built with
              offline use in mind. Since users (especially students) often turn
              off Wi-Fi to focus, the app is designed to work entirely offline.
              All features — including creating plans, editing sessions, and
              managing D-Days — can function without internet. Changes are
              stored locally and synced automatically when the device goes
              online. Every page is cached to ensure the app remains accessible
              under any network condition.
            </li>
            <li className="mt-4">
              <strong>Session Block Management</strong>: Users can add, edit,
              delete, and reorder session blocks within a plan. Each block can
              be tagged, timed, and remarked.
            </li>
            <li className="mt-4">
              <strong>Anonymous Onboarding</strong>: Anyone can start using
              Yawmly instantly — no sign-up or login required. This allows users
              to explore or use the full functionality without creating an
              account.
            </li>
            <li className="mt-4">
              <strong>Google & Email Sign-In</strong>: If users wish to sync
              across devices or secure their data, they can register via email
              or simply connect with their Google account. The app intelligently
              merges local data with the online database during sign-in,
              preventing data loss.
            </li>
            <li className="mt-4">
              <strong>Auto Sync & Smart Merge</strong>: All user data — whether
              from local usage or authenticated sessions — is auto-synced and
              merged seamlessly when the user signs in. This ensures users never
              lose progress and can resume exactly where they left off.
            </li>
            <li className="mt-4">
              <strong>Responsive Design</strong>: The interface adapts smoothly
              across phones, tablets, and desktops. All interactions — from
              planning to editing — are optimized for touch and mouse input.
            </li>
            <li className="mt-4">
              <strong>PWA Installation</strong>: Yawmly can be installed on any
              device like a native app. Once installed, it launches
              independently, offers a full-screen experience, and works offline
              without needing a browser.
            </li>
            <li className="mt-4">
              <strong>Minimal & Focused UI</strong>: The interface is
              intentionally clean and clutter-free — avoiding unnecessary
              elements to help users stay focused on their plans.
            </li>
          </ul>
        </div>

        <hr className="my-8" />

        {/* Authentication Flow */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-left">
            🔐 Authentication Flow
          </h2>
          <p>
            This part of the journey was the most tricky — especially trying to
            make sure that users could use the app anonymously, but still retain
            their data if they decided to register later. Although normal
            login-registration through forms was straightforward, with Google
            sign-in, a lot of different scenarios started appearing depending on
            what order users followed.
          </p>
          <p className="mt-4">
            Following is a description of every major situation/scenery based on
            how a user could land on the platform and choose to log in or sync
            their data.
          </p>

          <hr className="my-8" />

          <h3 className="text-2xl font-bold mb-4">
            🧊 Registration Through Form
          </h3>
          <p>
            After the welcome page, user goes to the account page and fills up
            the registration form with email and password. The system looks for
            any user doc in the DB with the email. If any doc is found, it
            prompts the user to login. Or else, the local data is merged with
            the new email and password and is saved online and locally.
          </p>

          <hr className="my-8" />

          <h3 className="text-2xl font-bold mb-4">🧊 Login Through Form</h3>
          <p>
            User logins through login form. System finds the user account with
            the email and checks whether there has been any kind of modification
            to the local data.
          </p>
          <p className="mt-4">
            <em className="font-medium">Local data was not modified</em>: Online
            data is set as the user's data.
          </p>
          <p className="mt-4">
            <em className="font-medium">Local data was modified</em>: Prompts
            user to keep any one version of the data i.e. either the online
            version or the local version. The other version is lost permanently.
          </p>
          <ul>
            <li className="mt-2">
              <em className="font-medium">User selects to keep local data</em>:
              Email and password get entried to the user doc, uid is updated
              (online one is kept) and the updated user doc is synced.
            </li>
            <li className="mt-2">
              <em className="font-medium">User selects to keep online data</em>:
              Online data is set as the user data and gets synced. Local data
              gets overwritten.
            </li>
          </ul>

          <hr className="my-8" />

          <h3 className="text-2xl font-bold mb-4">
            🧊 Straight Up Google Signup
          </h3>
          <p>
            An user enters the app for the first time and directly clicks on the
            "Sign in with Google" button. The app looks for any account of the
            Google account's email in the DB and finds none. A new user doc with
            the email is created and synced.
          </p>

          <hr className="my-8" />

          <h3 className="text-2xl font-bold mb-4">🧊 Google Sign Up</h3>
          <p>
            After getting welcomed, when the user signs in with Google from the
            `account` page, the system looks for any user account with the email
            in the DB and finds none. The local dataset gets merged with the
            Google account's email. The merged dataset gets saved and synced.
          </p>

          <hr className="my-8" />

          <h3 className="text-2xl font-bold mb-4">🧊 Google Sign In</h3>
          <p>
            User signs in with google and an account with the Google account's
            email is found in the DB. The app checks if the local data set was
            modified.
          </p>
          <p className="mt-4">
            <em className="font-medium">Local data was not modified</em>: Online
            data is set as the user's data.
          </p>
          <p className="mt-4">
            <em className="font-medium">Local data was modified</em>: Prompts
            user to keep any one version of the data i.e. either the online
            version or the local version. The other version is lost permanently.
          </p>
          <ul>
            <li className="mt-2">
              <em className="font-medium">User selects to keep local data</em>:
              Email and password get entried to the user doc, uid is updated
              (online one is kept) and the updated user doc is saved locally and
              online.
            </li>
            <li className="mt-2">
              <em className="font-medium">User selects to keep online data</em>:
              Online data is set as the user data and gets synced.
            </li>
          </ul>
        </div>

        <hr className="my-8" />

        {/* Data Sync Algorithm */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-left">
            💾 Data Sync Algorithm
          </h2>
          <p>
            The entire user data is one solid object. Everything - plans,
            d-days, settings, account info etc. are in this one object - to keep
            the infrastructure simple. Initially, the web app gets the data from
            local/online DB and saves in the context. This save data is the one
            with which the users always interacts with. Whenever an user updates
            any value of this dataset, the update logic is triggered which
            replaces this the data objects in local storage and online DB with
            this updated object.
          </p>
          <p className="mt-4">
            If there is no internet, the data is only saved in local storage.
            When the device gains internet connection, the app checks whether
            the local version is the most recent one. If so, then it replaces
            the online dataset with this local dataset. This is how Yawmly runs
            a smooth and fast data sync process in the background which is
            simple yet efficient.
          </p>
          <p className="mt-4">
            NB: Online sync only works if the user is logged in to any account.
          </p>
        </div>

        <hr className="my-8" />

        {/* Challenges & Bugs Faced */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-left">
            🐞 Challenges & Bugs Faced
          </h2>
          <p>
            While building Yawmly, one of the biggest challenges was managing
            the authentication flow, especially with Google Sign-In and syncing
            that with existing local or anonymous data. There were many edge
            cases — like when a user signs up anonymously first and later
            connects their Google account — where data merging had to be handled
            without conflicts. Designing a system that could intelligently
            detect whether to create, merge, or reuse a user document required a
            lot of trial, testing, and logic tweaking.
          </p>
          <p className="mt-4">
            Another tricky part was ensuring that the app worked offline without
            compromising on data reliability. Handling localStorage, syncing
            with MongoDB, and dealing with temporary session states introduced
            bugs like duplicate data, sync overwrites, and stale sessions.
            Getting the app to detect online/offline status accurately and defer
            syncing accordingly took multiple iterations.
          </p>
        </div>

        <hr className="my-8" />

        {/* Optimization & Performance */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-left">
            🚀 Optimization & Performance
          </h2>
          <p>
            Yawmly is a PWA, and performance was a key priority from the start.
            All pages are cached, so even without internet, the user can open
            the app, view their plans, and continue using it. Data operations
            like creating session blocks or editing D-Days are performed on
            localStorage first, and synced in the background when the user comes
            back online. This ensures that nothing breaks if the connection
            drops mid-session.
          </p>
          <p className="mt-4">
            To optimize rendering, only the primary selected plan is fetched and
            rendered on the homepage. Sessions are broken into blocks, and each
            block is color-tagged and displayed conditionally to avoid
            unnecessary re-renders. Slight animations are there in multiple
            components, so that the overall experience remains smooth and that
            the app provides a native like feel. The app feels fast and
            lightweight — intentionally designed this way to ensure
            productivity, not complexity. Even during syncing, the user doesn’t
            feel a delay — changes reflect instantly from localStorage, while
            cloud updates happen silently.
          </p>
        </div>

        <hr className="my-8" />

        {/* Lessons Learned/Reflections */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-left">
            🧠 Lessons Learned / Reflections
          </h2>
          <p>
            One big lesson was that even a "small idea" can become way more
            complex once you start building it right. What started as just an
            idea for a simple editable table evolved into a full-fledged PWA
            with authentication, syncing logic, offline support, and advanced
            user flow management.
          </p>
          <p className="mt-4">
            I also realized the importance of thinking from the user’s
            perspective. Features like optional onboarding, distraction-free UI,
            and offline usage weren’t just nice-to-haves — they became the core
            of the app's philosophy. It’s easy to over-engineer, but it’s much
            harder to keep things simple and effective.
          </p>
          <p className="mt-4">
            Lastly, I learned that it’s okay to break your routine for something
            you’re passionate about. Even though it took more than the "2 days"
            I initially gave myself, building Yawmly was completely worth it for
            what I ended up creating.
          </p>
        </div>

        <hr className="my-8" />

        {/* Final Words */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-left">Final Words ✅</h2>
          <p>
            Yawmly started as a quick personal tool, but ended up becoming
            something I genuinely enjoy using and am proud of building. This
            journey taught me a lot — not just about code, but about
            productivity, persistence, and building with purpose. There’s still
            a lot to improve. But for now, I’m happy with where it stands. If
            you’ve read this far — thank you. Hope Yawmly adds value to your
            day, the way it did to mine.
          </p>
          <p className="mt-3">
            ~{" "}
            <Link
              href={"https://shahsaminyasar.vercel.app"}
              className="text-[#ff6302] font-medium"
            >
              Shah Samin Yasar
            </Link>{" "}
            - Monday, 14 April, 2025
          </p>
        </div>
      </section>

      <footer className="text-center py-10 mx-0 border-t border-t-slate-200 mt-5 w-full text-xs sm:text-sm">
        Copyright 2025 &copy;{" "}
        <Link href={"https://shahsaminyasar.vercel.app"} target="_blank">
          SHAH SAMIN YASAR
        </Link>
      </footer>
    </>
  );
};

export default page;
