import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Error() {
  return (
    <div className="w-[95%] sm:w-[80%] mx-auto items-start gap-4 mt-10">
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>
          <p>We couldn't load this page right now. Try the following:</p>
          <ul className="list-inside list-disc text-sm mt-2">
            <li>Check your internet connection</li>
            <li>Make sure you're signed in</li>
            <li>Try refreshing the page</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default Error;
