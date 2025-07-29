import { Helmet } from 'react-helmet';
import { pageMeta } from "../data/pageMeta";

export default function Title({ page }) {
  const meta = pageMeta[page] || {
    title: 'Fallback Title',
    description: 'Fallback Description'
  };

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
    </Helmet>
  );
}
