import NextLink, { LinkProps as NextLinkProps } from "next/link";

type LinkProps = {
  children: React.ReactNode;
} & NextLinkProps;

const Link = (props: LinkProps) => {
  return (
    <NextLink {...props} className="font-bold text-primary">
      {props.children}
    </NextLink>
  );
};

export default Link;
