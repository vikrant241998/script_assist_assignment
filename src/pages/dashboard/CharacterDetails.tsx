import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import "../../styles/characterDetails.css";

export default function CharacterDetails() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery(
    ["character", id],
    async () => {
      const res = await axios.get(`https://ghibliapi.vercel.app/films/${id}`);
      return res.data;
    },
    {
      enabled: !!id, // <- THIS IS IMPORTANT
    }
  );

  // Data enrichment function
  const navigate = useNavigate();
  if (!id) return <div>Invalid character ID.</div>;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading character.</div>;

  return (
    <div className="banner-handler">
      <div className="banner-container" data-aos="zoom-in" data-aos-duration="2000" >
        <h3>{data.title}</h3>
        <img src={data.movie_banner} alt={data.title} />
      </div>
      <div className="descr-para" >
        <p data-aos="zoom-in" data-aos-duration="2000">{data.description}</p>
      </div>

      <div className="banner-wrapper" data-aos="zoom-in" data-aos-duration="2000">
        <div className="banner-img" data-aos="zoom-in" data-aos-duration="2000">
          <img src={data.image} alt={data.title} />
        </div>

        <div className="details-para" data-aos="zoom-in" data-aos-duration="2000">
          <div className="text-detail-container" data-aos="fade-up"
     data-aos-duration="1500">
            <span>Title :</span>
            <span className="text-details-data">{data.title}</span>
          </div>

          <div className="text-detail-container" data-aos="fade-up"
     data-aos-duration="1500">
            <span>Title Romanised :</span>
            <span className="text-details-data">
              {data.original_title_romanised}
            </span>
          </div>

          <div className="text-detail-container" data-aos="fade-up"
     data-aos-duration="1500">
            <span>Release Date :</span>
            <span className="text-details-data">{data.release_date}</span>
          </div>

          <div className="text-detail-container" data-aos="fade-up"
     data-aos-duration="1500">
            <span>Score :</span>
            <span className="text-details-data">{data.rt_score}</span>
          </div>

          <div className="text-detail-container" data-aos="fade-up"
     data-aos-duration="1500">
            <span>Director :</span>
            <span className="text-details-data">{data.director}</span>
          </div>

          <div className="text-detail-container" data-aos="fade-up"
     data-aos-duration="1500">
            <span>Producer :</span>
            <span className="text-details-data">{data.producer}</span>
          </div>
        </div>
      </div>

      <div className="detail-btn">
        <button onClick={() => navigate(`/enrichment/${id}`)} >
          More Details
        </button>
      </div>
    </div>
  );
}
