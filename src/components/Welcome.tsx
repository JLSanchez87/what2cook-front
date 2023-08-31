import Link from "next/link";

const Welcome = () => {
  return (
    <>
      <h1>Welcome to what2cook!</h1>
      <p>
        If you haven't got an account please <Link href="/">register</Link>
      </p>
      <p>
        Or click the link to <Link href="/login">login</Link>!
      </p>
    </>
  );
};

export default Welcome;
