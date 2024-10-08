import React, {useState} from 'react';
import {AdType} from "@/app/(routes)/edit-ad/[id]/page";
import {MarkerF, OverlayView} from "@react-google-maps/api";
import MarkedItem from "@/app/_components/MarkedItem";

type MarkerForMapType = {
    item: AdType
}

function MarkerForMap({item}: MarkerForMapType) {
    const [selectedAd, setSelectedAd] = useState<AdType | null>()
    return (
        <div>
            <MarkerF position={item.coordinates}
                     onClick={() => setSelectedAd(item)}>
                {selectedAd && <OverlayView position={selectedAd.coordinates}
                                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    <MarkedItem selectedItem={selectedAd} closeItemHandler={()=> setSelectedAd(null)}/>
                </OverlayView>}
            </MarkerF>
        </div>
    );
}

export default MarkerForMap;