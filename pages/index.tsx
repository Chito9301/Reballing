export default function Home() {
  return (
    <div>
      <p>API KEY: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY}</p>
      <p>AUTH DOMAIN: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}</p>
      <p>PROJECT ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}</p>
      <p>STORAGE BUCKET: {process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}</p>
      <p>MESSAGING SENDER ID: {process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}</p>
      <p>APP ID: {process.env.NEXT_PUBLIC_FIREBASE_APP_ID}</p>
    </div>
  );
}

