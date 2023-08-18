'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  address: string;
}

const LATLNGDEFAULT = { lat: 33.450701, lng: 126.570667 };

const KakaoMap: FC<KakaoMapProps> = ({ address }) => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>(
    LATLNGDEFAULT
  );

  useEffect(() => {
    if (address === '') {
      setCenter(LATLNGDEFAULT);
      return;
    }
    // 주소로 좌표를 검색합니다
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder(); // 주소-좌표 반환 객체를 생성
      // 주소로 좌표를 검색
      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면
          setCenter({ lat: Number(result[0].y), lng: Number(result[0].x) });
        } else {
          setCenter(LATLNGDEFAULT);
        }
      });
    });
  }, [address]);

  return (
    <div className='w-[100%] h-[300px]'>
      <Map
        center={center}
        style={{ width: '100%', height: '100%' }}
        scrollwheel={false}
      >
        <MapMarker // 마커를 생성합니다
          position={center}
        />
        <ZoomControl />
      </Map>
    </div>
  );
};

export default KakaoMap;
