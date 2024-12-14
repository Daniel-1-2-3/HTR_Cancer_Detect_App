
import './Hero.css';

const Hero = () => {

    return (
        <div
            id="video-frame"
            className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
        >
            <video
                src="background8.mp4"
                autoPlay
                loop
                muted
                className="absolute left-0 top-0 size-full object-cover object-center w-screen"
                style={{ opacity: 0.6 }}
            />

            <div className="absolute left-0 top-0 size-full bg-black opacity-40 z-20 overflow-hidden"></div>

            <h1 className="special-font text-6xl font-bold text-white mb-24 mr-8 sm:text-8xl absolute bottom-5 right-5 z-50 drop-shadow-lg">
                PROTECT YOUR SKIN
            </h1>

            {/* Content Section */}
            <div className="absolute left-0 top-0 z-40 size-full mt-8 ml-4">
                <div className="mt-24 px-5 sm:px-10">
                    <h1 className="special-font text-6xl font-bold text-white sm:text-8xl">
                        SkinScope
                    </h1>

                    <p className="mb-5 font-robert-regular text-lg text-white sm:text-xl mt-4">
                        1 in 5 Americans will develop skin cancer by the age of 70...
                        <br></br>
                        More than 2 people die of skin cancer in the U.S. every hour...
                        <br></br>
                        <br></br>
                        Reduce the risk, quickly detect skin cancer early.
                        <br></br>
                        <br></br>
                        Start today with our skin cancer detection tool, and from there recive instant treatment recommendations

                    </p>
                </div>
            </div>
        </div>
    );
};

export default Hero;