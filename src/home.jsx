import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import  SwiperCore,{  Pagination,EffectCoverflow } from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react";
import { Sliderdata } from '../src/Components/sliderdata'


SwiperCore.use([EffectCoverflow, Pagination]);

function Home(props){
    
    fetch('http://localhost:8000/update_delivered', {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        }
    });

    function refreshPage() {
        window.location.reload();
    }
    function check_user(){
    if (localStorage.user){
        return (<p class='user_name'>Welcome {localStorage.getItem("current_user")}</p>)
    }
    }
    function check_superuser(){
    if(localStorage.user === 'super_user'){
    return <a class="nav-link normal" href="/admin_promote"> Promote employee </a>
    }}
    function logout(){
        localStorage.clear()
    }

    return(
        <div>
            
            <header class="masterhead mb-auto">
                <div class="inner">
                {check_user()}
                    <h3 class="masthead-brand">HomeNow</h3>
                    {
                        localStorage.token ?
                        <nav class="nav nav-masthead">
                            <a class="nav-link active" href="/">Home</a>
                            <a class="nav-link normal" href="/list">List of Items</a>
                            <a class="nav-link normal" href="/upload-image"> Upload Images </a>
                            <a class="nav-link normal" href="/detail-image"> List of Images </a>
                            <a class="nav-link normal" href="/chat-room"> Private Chat </a>
                            {check_superuser()}
                            <a class="nav-link normal" onClick={logout} href='/'> Logout </a>
                        </nav>:
                        <nav class="nav nav-masthead">
                            <a class="nav-link active" href="/">Home</a>
                            <a class="nav-link normal" href="/login">Login</a>
                            <a class="nav-link normal" href="/signup">Signup</a>
                        </nav>
                    }
                </div>
            </header>
            <div>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
                }}
                pagination={true}
                className="mySwiper"
            >
                {Sliderdata.map((img, i) => {
                return (
                    <SwiperSlide key={i}>
                    <img class='swipe-image'src={img} alt="" />
                    </SwiperSlide>
                );
                })}
            </Swiper>
    </div>
            
        </div>
        
    )
}

export default Home;