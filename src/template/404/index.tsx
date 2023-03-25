import Link from "next/link";

export const NotFoundPage = () => {
  return (
    <>
      <div>
        <h1>404 - Page Not Found</h1>
        <Link href="/">
          Go back home
        </Link>
      </div>
    </>
  )
}

NotFoundPage.layout = 'public'