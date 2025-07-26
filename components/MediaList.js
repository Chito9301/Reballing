// components/MediaList.js
import { useEffect, useState } from 'react';
import { fetchMedia } from '../utils/api';

export default function MediaList() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedia()
      .then(data => {
        setMedia(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando media...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Media subida</h2>
      <ul>
        {media.map(item => (
          <li key={item._id}>
            <strong>{item.title}</strong> - {item.description}
            <br />
            <img src={item.mediaUrl} alt={item.title} width={150} />
          </li>
        ))}
      </ul>
    </div>
  );
}
