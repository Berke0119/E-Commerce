import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHooli,
  faAws,
  faStripe,
  faEarlybirds,
  faLyft,
  faConnectdevelop
} from '@fortawesome/free-brands-svg-icons';

const TrustedBrands = () => {
  return (
    <section className="bg-[#FAFAFA] py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-24 flex-wrap text-[#737373] text-4xl" >
        <FontAwesomeIcon icon={faConnectdevelop} size="3x"/>
        <FontAwesomeIcon icon={faLyft} size="3x"/>
        <FontAwesomeIcon icon={faEarlybirds} size="3x"/>
        <FontAwesomeIcon icon={faStripe} size="3x"/>
        <FontAwesomeIcon icon={faAws} size="3x"/>
        <FontAwesomeIcon icon={faHooli} size="3x"/>
      </div>
    </section>
  );
};

export default TrustedBrands;
