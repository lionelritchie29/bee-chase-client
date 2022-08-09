import useWindowSize from '../../hooks/use-window-size';

type Props = {
  children: any;
  className?: string;
  style?: any;
};

export default function Layout({ children, className = '', style = {} }: Props) {
  const size = useWindowSize();

  if (size.width && size.width >= 1024) {
    return (
      <section className='h-screen w-full bg-white absolute top-0 left-0 flex justify-center items-center'>
        This app could only be used in mobile or tablets.
      </section>
    );
  }

  return (
    <div>
      <main style={style} className={`min-h-screen px-6 ${className}`}>
        {children}
      </main>
    </div>
  );
}
