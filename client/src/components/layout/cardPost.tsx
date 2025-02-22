import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  IconButton,
} from "@material-tailwind/react";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      className={`h-5 w-5 ${filled ? "text-yellow-500" : "text-gray-300"}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.9 5.836a1 1 0 00.95.69h6.098c.969 0 1.371 1.24.588 1.81l-4.955 3.6a1 1 0 00-.364 1.118l1.9 5.836c.3.92-.755 1.687-1.54 1.118l-4.955-3.6a1 1 0 00-1.176 0l-4.955 3.6c-.785.569-1.84-.198-1.54-1.118l1.9-5.836a1 1 0 00-.364-1.118l-4.955-3.6c-.783-.57-.381-1.81.588-1.81h6.098a1 1 0 00.95-.69l1.9-5.836z"
      />
    </svg>
  );
}

export default function CardPost({
  firstname,
  avatar,
  rating,
  content,
}: {
  firstname: string;
  avatar: string;
  rating: number;
  content: string;
}) {
  return (
    <Card  shadow={false} className="p-8 w-full max-w-[36rem] bg-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <Avatar size="lg" variant="circular" src={avatar} alt={firstname} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />

        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>

        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {firstname}
            </Typography>
            <div className="flex items-center gap-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} filled={i < rating} />
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Typography  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{content}</Typography>
      </CardBody>
    </Card>
  );
}
