import Image from 'next/image';

const Test = () => {
  return (
    <div>
      <h1>Image test</h1>
      <div>
        <Image
          width={1000}
          height={1000}
          src={
            'https://upload.wikimedia.org/wikipedia/commons/b/b7/Mandelbrot_set_5000px.png'
          }
          alt="image"
        />
      </div>

      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Mandelbrot_set_5000px.png"
          alt="image"
        />
      </div>
    </div>
  );
};

export default Test;
