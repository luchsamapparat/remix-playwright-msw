import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
  const responseBody = await response.json();
  return responseBody[0] as string;
};

export default function Index() {
  const quote = useLoaderData<typeof loader>();
  return (
    <blockquote>
      {quote}
    </blockquote>
  );
}
