import {
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
  PortableTextReactComponents,
} from "@portabletext/react";
import { urlFor } from "@/lib/sanity-client";

interface ImageProps {
  asset: {
    _ref: string;
  };
  alt?: string;
}

interface CallToActionProps {
  text: string;
  url: string;
}

interface LinkProps {
  href: string;
  _type: string;
}

export const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => (
      <h1 className="mb-4 mt-8 text-4xl font-bold text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-6 text-3xl font-semibold text-gray-800">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-4 text-2xl font-medium text-gray-700">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-3 text-xl font-medium text-gray-700">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-gray-600">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-blue-500 py-2 pl-4 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },

  types: {
    image: ({ value }: PortableTextComponentProps<ImageProps>) => (
      <div className="my-8">
        <img
          src={urlFor(value.asset._ref).url()}
          alt={value.alt || ""}
          className="h-auto max-w-full rounded-lg shadow-md"
        />
      </div>
    ),
    callToAction: ({
      value,
      isInline,
    }: PortableTextComponentProps<CallToActionProps>) =>
      isInline ? (
        <a
          href={value.url}
          className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
        >
          {value.text}
        </a>
      ) : (
        <div className="my-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          {value.text}
        </div>
      ),
  },

  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps<LinkProps>) => {
      const rel = !value?.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value?.href}
          rel={rel}
          className="text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-800"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-outside list-disc space-y-2 text-gray-600">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-outside list-decimal space-y-2 text-gray-600">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};
