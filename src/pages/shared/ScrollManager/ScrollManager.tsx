import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollManager = () => {
  const { pathname } = useLocation(); // বর্তমান পেজের path ট্র্যাক করুন

  useEffect(() => {
    // রাউট চেঞ্জের সাথে সাথে স্ক্রল পজিশন সংরক্ষণ এবং পুনরুদ্ধার
    const savedPosition = sessionStorage.getItem(pathname); // পেজের স্ক্রল পজিশন পুনরুদ্ধার

    if (savedPosition !== null) {
      window.scrollTo(0, parseInt(savedPosition)); // পূর্ববর্তী স্ক্রল পজিশনে নিয়ে আসা
    } else {
      window.scrollTo(0, 0); // নতুন পেজ হলে উপরে নিয়ে যাওয়া
    }

    // স্ক্রল পজিশন সংরক্ষণ পেজ ছাড়ার সময়
    const handleBeforeUnload = () => {
      sessionStorage.setItem(pathname, window.scrollY.toString()); // স্ক্রল পজিশন সংরক্ষণ
    };

    window.addEventListener("beforeunload", handleBeforeUnload); // পেজ ছাড়ার সময়
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload); // ক্লিনআপ
    };
  }, [pathname]); // path পরিবর্তন হলে পুনরায় চলবে

  return null; // UI-তে কিছু রেন্ডার করবে না
};

export default ScrollManager;
