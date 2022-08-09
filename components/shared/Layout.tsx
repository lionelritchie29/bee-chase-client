import useWindowSize from '../../hooks/use-window-size';

type Props = {
  children: any;
};

export default function Layout({ children }: Props) {
  const size = useWindowSize();

  if (size.width && size.width >= 1024) {
    return (
      <section className='h-screen w-full bg-white absolute top-0 left-0 flex justify-center items-center'>
        This app could only be used in mobile
      </section>
    );
  }

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
