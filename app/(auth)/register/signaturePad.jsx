'use client';
import SignatureCanvas from 'react-signature-canvas';
import { useRef, useState } from 'react';
import Button from '../../../sharedComponents/components/button';

export default function SignaturePad() {
  const sigRef = useRef();
  const [signature, setSignature] = useState(null);

  const clear = () => sigRef.current.clear();
  
  const save = () => {
    const dataURL = sigRef.current.toDataURL(); // Base64 image
    setSignature(dataURL);
    // Send to backend
    uploadSignature(dataURL);
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: 300,
          height: 170,
          className: 'border border-gray-300'
        }}
      />
      <button className='py-2 px-3 bg-main-green text-main-beige rounded-md mt-2 mx-2' onClick={clear}>Clear</button>
      <button className='py-2 px-3 bg-main-green text-main-beige rounded-md mt-2 mx-2' onClick={save}>Save Signature</button>

    </div>
  );
}