import Logo from "@/components/Logo";
export default function Thankyou() {
    return (
        <div className="w-[100%] relative z-[1] flex flex-col justify-center items-center box-border">
            <audio id="audio" src="assets/audio/music.mp3" loop hidden />
            <div className="relative z-[15] h-[100%] flex flex-col min-h-[87vh] pt-0 pr-0 pb-[120px] pl-0 justify-center items-center box-border">
                <div className="w-[100%] pt-0 pr-[80px] pb-0 pl-[80px] mt-0 mr-auto mb-0 ml-auto">
                    <div className="text-center box-border">
                        <Logo />
                        <h2 className="[100%] m-auto max-w-[900px]:text-[30px] text-[30px] max-w-[1600px]:text-[30px] text-yellow-400" >
                            Thank you! We'll get back to you soon!
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}