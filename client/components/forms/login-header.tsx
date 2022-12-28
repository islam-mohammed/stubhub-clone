import Image from "next/image";

const LoginHeader = ({ title }: { title: string }) => {
  return (
    <div className="mb-12">
      <Image
        className="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
        width="48"
        height="48"
      />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {title}
      </h2>
    </div>
  );
};

export default LoginHeader;
