import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../../styles/dataEnrichment.css";

export default function DataEnrichment() {
  const { id } = useParams();

  const { data: filmData, isLoading } = useQuery(["film", id], async () => {
    const res = await axios.get(`https://ghibliapi.vercel.app/films/${id}`);
    return res.data;
  });

  const fetchAll = async (urls: string[]) => {
    const promises = urls.map((url) => axios.get(url).then((res) => res.data));
    return Promise.all(promises);
  };

  const { data: people, isLoading: loadingPeople } = useQuery(
    ["people", id],
    () => fetchAll(filmData?.people || []),
    {
      enabled: !!filmData,
    }
  );

  const { data: species } = useQuery(
    ["species", id],
    () => fetchAll(filmData?.species || []),
    {
      enabled: !!filmData,
    }
  );

  const { data: vehicles } = useQuery(
    ["vehicles", id],
    () => fetchAll(filmData?.vehicles || []),
    {
      enabled: !!filmData,
    }
  );

  if (isLoading || loadingPeople) return <div>Loading enrichment data...</div>;

  return (
    <>
      <div className="enrich-container">
        {filmData?.movie_banner && (
          <div className="enrich-banner">
            <img
              src={filmData.image}
              alt={filmData.title}
              data-aos="zoom-in"
              data-aos-duration="2000"
            />
          </div>
        )}

        <div>
          <h2
            className="enrich-heading"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            {filmData?.title}
          </h2>

          <h3
            className="enrich-heading-text"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            Peoples
          </h3>
          <div className="row">
            {people?.map((p: any, index: number) => (
              <div
                className="col-md-4 col-md-6 col-lg-4 mb-4 "
                key={p.id || `person-${index}`}
              >
                <div
                  className="card h-100 card-wrap"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                >
                  <div className="card-body">
                    <h5 className="card-title"> {p.name || "N/A"}</h5>
                    <div className="card-text">
                      <strong>Gender:</strong>
                      <p className="enrich-para-align"> {p.gender || "N/A"}</p>
                    </div>
                    <div className="card-text">
                      <strong>Age:</strong>
                      <p className="enrich-para-align"> {p.age || "N/A"}</p>
                    </div>
                    <div className="card-text">
                      <strong>Eye Color:</strong>
                      <p className="enrich-para-align">
                        {p.eye_color || "N/A"}
                      </p>
                    </div>
                    <div className="card-text">
                      <strong>Hair Color:</strong>
                      <p className="enrich-para-align">
                        {p.hair_color || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3
            className="enrich-heading-text"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            Species
          </h3>
          <div className="row">
            {species?.map((s: any, index: number) => (
              <div
                className="col-md-4 col-md-6 col-lg-4 mb-4"
                key={s.id || `species-${index}`}
              >
                <div
                  className="card h-100 card-wrap"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                >
                  <div className="card-body">
                    <h5 className="card-title">{s.name || "N/A"}</h5>
                    <div className="card-text">
                      <strong>Classification:</strong>
                      <p className="enrich-para-align">
                        {s.classification || "N/A"}
                      </p>
                    </div>

                    <div className="card-text">
                      <strong>Eye Colors:</strong>
                      <p className="enrich-para-align">
                        {s.eye_colors || "N/A"}
                      </p>
                    </div>
                    <div className="card-text">
                      <strong>Hair Colors:</strong>
                      <p className="enrich-para-align">
                        {s.hair_colors || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3
            className="enrich-heading-text"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            Vehicles
          </h3>
          <div className="row">
            {vehicles?.map((v: any, index: number) => (
              <div
                className="col-md-4 col-md-6 col-lg-4 mb-4"
                key={v.id || `vehicle-${index}`}
              >
                <div
                  className="card h-100 card-wrap"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                >
                  <div className="card-body">
                    <h5 className="card-title">{v.name || "N/A"}</h5>
                    <div className="card-text">
                      <strong>Description:</strong>
                      <p className="enrich-para-align">
                        {v.description || "N/A"}
                      </p>
                    </div>
                    <div className="card-text">
                      <strong>Class:</strong>
                      <p className="enrich-para-align">
                        {v.vehicle_class || "N/A"}
                      </p>
                    </div>
                    <div className="card-text">
                      <strong>Length:</strong>
                      <p className="enrich-para-align">{v.length || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
