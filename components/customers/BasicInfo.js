import React, { useEffect, useState } from "react";
import { RiUserAddLine } from "react-icons/ri";
import { storage } from "../../firebase.config";
import { Textarea, Grid } from "@nextui-org/react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { MdDelete } from "react-icons/md";
import { AiOutlineCloudUpload, AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

// load google map api js

export function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const extractAddress = (place) => {
  const Geo_address = {
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + zip + state + this.country;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return Geo_address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("locality")) {
      Geo_address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      Geo_address.state = value;
    }

    if (types.includes("postal_code")) {
      Geo_address.zip = value;
    }

    if (types.includes("country")) {
      Geo_address.country = value;
    }
  });

  return Geo_address;
};

function BasicInfo({ formData, setFormData, isAlert}) {
  const searchInput = React.useRef(null);
  const [Geo_address, set_Geo_address] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState([])

  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    set_Geo_address(extractAddress(place));
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const _Geo_address = extractAddress(place);
        setAddress(_Geo_address);
        searchInput.current.value = _address.plain();
      });
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords);
      });
    }
  };

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //Object.assign(formData, Geo_address);
  formData.address =
    Geo_address.city +
    ", " +
    Geo_address.state +
    ", " +
    Geo_address.zip +
    ", " +
    Geo_address.country;

  formData.city = Geo_address.city;
  formData.state = Geo_address.state;
  formData.country = Geo_address.country;

  /**Still an issue to solve :::: when pressing previous, data becomes undefined!!! **/

  const handleProfilePhotoUpload = (e) => {
    const imageFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `userProfilePhotos/${Date.now()}-${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({...formData, profilePhoto: downloadURL});
          setTimeout(() => {
            alert("Cover photo added");
          }, 500);
        });
      }
    );
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `userProfilePhotos/${Date.now()}-${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({...formData, coverPhoto: downloadURL});
          setTimeout(() => {
            alert("Cover photo added");
          }, 500);
        });
      }
    );
  };

  const handleDeleteImage = (e) =>{
    const deleteRef = ref(storage, e);
    deleteObject(deleteRef)
      .then(() => {
        setFormData({...formData, coverPhoto: ""});
        setTimeout(() => {
          alert("Cover Photo Deleted")
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          alert("Error while deleting, try again!")
        }, 1000);
      });
  }


  return (
    <div className="flex flex-col md:grid grid-cols-2 gap-x-8 md:w-[70%]  gap-y-6 md:gap-y-8 md:border md:border-1 md:border-gray-400 md:rounded-lg p-8 font-montserrat">
      <div className="text-left md:col-span-2 text-xl md:text-5xl font-thin">
        <h3>Tell us about you</h3>
      </div>

      <div className="md:col-span-2">
        {formData.profilePhoto 
          ? (
            <div className="flex items-center justify-center p-2 ">
              <div className="relative h-32 w-32">
                <Image 
                src={formData.profilePhoto}
                alt="profile photo"
                layout="fill"
                quality={80}
                objectFit="cover"
                className="rounded-full"
                />
                <button className="z-10 absolute rounded-full right-1 bottom-1 p-1 bg-red-700 text-white" 
                  onClick={()=>handleDeleteImage(formData.profilePhoto)}>
                  <MdDelete size={25}/>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center p-2 ">
              <RiUserAddLine className="text-8xl bg-primaryYellow p-2 rounded-full hover:border-4 hover:border-red-700"/>     
              <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoUpload}
              className="pl-[5rem] absolute border-2 h-[100px] opacity-0 cursor-pointer"
              />
            </div>
          )}

      </div>

      {formData.coverPhoto 
        ? (
          <div className="md:col-span-2 h-32 rounded-lg flex flex-col items-center justify-center relative cursor-pointer">
            <Image 
            src={formData.coverPhoto}
            alt="Cover Photo"
            layout="fill"
            objectFit="cover"
            className="relative rounded-lg opacity-80"
            />
            <button className="z-10 absolute rounded-full -left-4 -top-6 p-1 bg-red-700/80 text-white hover:bg-red-700" 
              onClick={()=>handleDeleteImage(formData.coverPhoto)}>
              <AiOutlineClose size={30}/>
            </button>
          </div>
          
        ) : (  
        <div className="md:col-span-2 border-[2px] border-dashed p-6 border-slate-400 rounded-lg flex flex-col items-center justify-center relative cursor-pointer hover:border-primaryYellow hover:border-[4px]">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="pl-[5rem] absolute border-2 h-[100px] opacity-0 cursor-pointer"
          />
          <AiOutlineCloudUpload size={40} className="text-primaryYellow" />
          <div>
            <h3 className="text-sm cursor-pointer">Upload a cover Photo</h3>
          </div>
        </div>
        )}

      <div className="flex flex-col gap-2">
        <label className="text-sm md:text-base">
          Username<sup>*</sup>
        </label>
        <input
          type="text"
          className={isAlert ? "py-2 border-solid border-b border-black outline-red-700" : "py-2 border-solid border-b border-black focus:outline-none"}
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm md:text-base">
          Email<sup>*</sup>
        </label>
        <input
          type="text"
          className={isAlert ? "py-2 border-solid border-b border-black outline-red-700" : "py-2 border-solid border-b border-black focus:outline-none"}
          value={formData.email}
          onChange={(event) => {
            setFormData({ ...formData, email: event.target.value });
          }}
        />
      </div>

      <div className="col-span-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base">
            Profile Bio<sup className="italic"> (optional)</sup>
          </label>
          <Textarea
          placeholder="Enter a short profile bio."
          maxlength="60"
          onChange={(event) => {
            setFormData({ ...formData, bio: event.target.value });
          }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm md:text-base">
          First Name<sup>*</sup>
        </label>
        <input
          type="text"
          className={isAlert ? "py-2 border-solid border-b border-black outline-red-700" : "py-2 border-solid border-b border-black focus:outline-none"}
          value={formData.firstName}
          onChange={(e) => {
            setFormData({ ...formData, firstName: e.target.value });
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm md:text-base">
          Last Name<sup>*</sup>
        </label>
        <input
          type="text"
          className={isAlert ? "py-2 border-solid border-b border-black outline-red-700" : "py-2 border-solid border-b border-black focus:outline-none"}
          value={formData.lastName}
          onChange={(e) => {
            setFormData({ ...formData, lastName: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
      <label className="text-sm md:text-base">
        Phone Number <span className="italic">(Optional)</span>
      </label>
      <input
        type="tel"
        className="py-2 border-solid border-b border-black"
        value={formData.phoneNumber}
        onChange={(event) => {
          setFormData({ ...formData, phoneNumber: event.target.value });
        }}
      />
    </div>


    <div className="flex flex-col gap-2">
      <label className="text-sm md:text-base">
        Sex<sup>*</sup>
      </label>
      <select
        name="sex"
        id="sex"
        className="py-2 border-solid border-b border-black focus:outline-none"
        onChange={(event) => {
          setFormData({ ...formData, sex: event.target.value });
        }}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Non-binary">Non-binary</option>
        <option value="Other">Other</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </select>
    </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm md:text-base">
          Password<sup>*</sup>
        </label>
        <input
          type="password"
          className={isAlert ? "py-2 border-solid border-b border-black outline-red-700" : "py-2 border-solid border-b border-black focus:outline-none"}
          value={formData.password}
          onChange={(event) => {
            setFormData({ ...formData, password: event.target.value });
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm md:text-base">
          Confirm Password<sup>*</sup>
        </label>
        <input
          type="password"
          className={isAlert ? "py-2 border-solid border-b border-black outline-red-700" : "py-2 border-solid border-b border-black focus:outline-none"}
          value={formData.confirmPassword}
          onChange={(event) => {
            setFormData({ ...formData, confirmPassword: event.target.value });
          }}
        />
      </div>

      <div className="col-span-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base">
            Address Location<sup>*</sup>
          </label>
          <input
            ref={searchInput}
            type="text"
            className={isAlert ? "py-2 border-solid border-b border-black outline-red-700" : "py-2 border-solid border-b border-black focus:outline-none"}
            value={Geo_address.address}
            placeholder="Search Address Location..."
            onChange={(event) => {
              setFormData({ ...formData, address: event.target.value });
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm md:text-base">City</label>
        <input
          type="text"
          className="py-2 border-solid border-b border-black"
          value={formData.city}
          onChange={(event) => {
            setFormData({ ...formData, city: event.target.value });
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm md:text-base">
          State<sup>*</sup>
        </label>
        <input
          type="text"
          className="py-2 border-solid border-b border-black"
          value={formData.state}
          onChange={(event) => {
            setFormData({ ...formData, state: event.target.value });
          }}
        />
      </div>

      <div className="col-span-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base">
            Country/Region<sup>*</sup>
          </label>
          <input
            type="text"
            className="py-2 border-solid border-b border-black"
            value={formData.country}
            onChange={(event) => {
              setFormData({ ...formData, country: event.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
