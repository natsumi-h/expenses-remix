import { Link } from "@remix-run/react";

function Logo() {
  return (
    <h1 id="logo">
      <Link to="/">MyExpenses</Link>
    </h1>
  );
}

export default Logo;
