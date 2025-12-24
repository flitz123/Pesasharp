export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-8">
      <div className="max-w-6xl mx-auto p-4 text-sm text-gray-600 flex justify-between items-center">
        <p>© {new Date().getFullYear()} PesaPlan. All rights reserved.</p>
        <div className="flex items-center space-x-4">
          <a
            href="https://x.com/moneyacademyKE"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            <img src="/assets/Twitter_logo.png" alt="Twitter" className="h-6 w-6" />            
            Twitter
          </a>
          <a
            href="https://youtube.com/playlist?list=PLwarXDNlUyjJ4R_gaIF_ado0gZ0Undk_M&si=BJGkf5XBpUH_fDrz"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
            <img src="/assets/Youtube_logo.png" alt="YouTube" className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/simplyougrow/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
            <img src="/assets/Instagram_logo.jfif" alt="Instagram" className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
