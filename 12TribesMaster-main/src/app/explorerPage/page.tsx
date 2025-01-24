import GalleryContainerCompoent from "@/components/ExplorerPageComponent/GalleryContainerComponent";
import PageHeaderComponent from "@/components/ExplorerPageComponent/PageHeaderComponent";
const Home: React.FC = () => {
  return (
    <div className='relative flex z-2 flex-col min-h-[100vh] max-w-[1600px] mx-auto box-border text-white p-2'>
      <PageHeaderComponent />
      <GalleryContainerCompoent owner=""/>
    </div>
  );
}

export default Home;
