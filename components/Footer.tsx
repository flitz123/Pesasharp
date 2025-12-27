import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

function TwitterLink() {
  return (
    <a href="https://x.com/moneyacademyKE" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faTwitter} />
    </a>
  );
}

function YouTubeLink() {
  return (
    <a href="https://youtube.com/playlist?list=PLwarXDNlUyjJ4R_gaIF_ado0gZ0Undk_M&si=BJGkf5XBpUH_fDrz" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faYoutube} />
    </a>
  );
}

function InstagramLink() {
  return (
    <a href="https://www.instagram.com/simplyougrow/" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faInstagram} />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-8">
      <div className="max-w-6xl mx-auto p-4 text-sm text-gray-600 flex justify-between items-center">
        <p>© {new Date().getFullYear()} PesaSharp. All rights reserved.</p>
        <div className="flex items-center space-x-4">
          <TwitterLink />
          <YouTubeLink />
          <InstagramLink />
        </div>
      </div>
    </footer>
  );
}
