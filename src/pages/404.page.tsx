import Link from "next/link";

export default function FourOhFour() {
  return <>
    <div>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        Go back home
      </Link>
    </div>
  </>
}

FourOhFour.layout = 'public'