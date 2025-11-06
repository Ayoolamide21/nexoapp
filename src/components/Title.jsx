import { useEffect } from 'react';
import { useSettings } from '../context/useSettings';


export default function Title({ page, description = '' }) {
  const { settings } = useSettings();

  //const siteName = settings?.sitename || 'Loading....';

  // Capitalize page name for the title
  const pageTitle = page ? page.charAt(0).toUpperCase() + page.slice(1) : 'Page';

  useEffect(() => {
     if (!settings?.sitename) return;

    document.title = `${pageTitle} | ${settings.sitename}`;

    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);
  }, [pageTitle, description, settings?.sitename]);

  return null;
}
