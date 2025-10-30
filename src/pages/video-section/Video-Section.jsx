import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

function VideoSection() {
    return (
        <>
            <Navbar />
            <div id='main-content'>
            <div className="container my-5">

                <h5 className=" fw-bold mt-4">Video Section :-</h5>

                <div className="row mb-4 mt-4">
                    <div className="col-md-12 d-flex justify-content-between align-items-center">

                        <div>
                            <h6 className="fw-bold">Video Title 1</h6>
                        </div>

                        <div>
                            <a
                                href="https://www.youtube.com/watch?v=example_video_id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                Watch on YouTube
                            </a>
                        </div>
                    </div>
                </div>


                <div className="row mb-4">
                    <div className="col-md-12 d-flex justify-content-between align-items-center">

                        <div>
                            <h6 className="fw-bold">Video Title 2</h6>
                        </div>

                        <div>
                            <a
                                href="https://www.youtube.com/watch?v=example_video_id_2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                Watch on YouTube
                            </a>
                        </div>
                    </div>
                </div>


            </div>
            </div>
            <Footer />
        </>
    );
}

export default VideoSection;