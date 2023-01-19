import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [isAgree, setIsAgree] = useState(false);
  const [isShowTerm, setIsShowTerm] = useState(false);

  const { data: checkout, isLoading } = useSWR(
    'https://6398216bfe03352a94c5a9f4.mockapi.io/api/v1/checkout/1',
    fetcher
  );

  const onSubmit = () => {
    alert('submitted!');
  };

  return (
    <div className="m-auto mt-20 flex gap-4  max-w-[450px]">
      {!isLoading && (
        <>
          <div className="border border-dark-900 rounded-lg p-4">
            <form className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Total</h2>
                <div className="text-2xl font-bold">${checkout.price}</div>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="font-bold">Notes From Seller</h4>
                <div>{checkout.sellerNotes}</div>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="font-bold">Fees</h4>
                <div>
                  <div className="flex justify-between">
                    <div>Service Fee</div>
                    <div>${checkout.serviceFee}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Order Processing Fee</div>
                    <div>${checkout.orderingFee}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="font-bold">Delivery</h4>
                <div>
                  <div className="flex justify-between">
                    <div>{checkout.delivery}</div>
                    <div>{checkout.deliveryFee}</div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <input
                  className="mr-2"
                  id="agree"
                  type="checkbox"
                  checked={isAgree}
                  onChange={(e) => setIsAgree(e.target.checked)}
                />
                <label for="agree">
                  I have read and agree to the current{' '}
                  <span
                    className="text-blue-400 cursor-pointer"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsShowTerm(true);
                    }}
                  >
                    Terms of Use
                  </span>
                  .
                </label>
              </div>
              <div className="flex align-center justify-center">
                <button
                  type="button"
                  className="bg-green-600 w-fit p-2 rounded-md hover:bg-green-700 disabled:bg-green-300"
                  onClick={onSubmit}
                  disabled={!isAgree}
                >
                  <span className="text-gray-50 font-semibold">Place Order</span>
                </button>
              </div>
              <div className="flex align-center justify-center">
                <div className="text-xs">*Exceptions my apply, see our Terms of Use</div>
              </div>
            </form>
          </div>

          {isShowTerm && (
            <div>
              <div className="absolute bg-stone-900/25 w-screen h-screen top-0 left-0 flex justify-center items-center">
                <div className="bg-stone-50 p-8 w-3/6 h-4/5 relative">
                  <iframe
                    src={`https://docs.google.com/viewerng/viewer?url=${checkout.termsOfUse}&embedded=true`}
                    frameborder="0"
                    height="100%"
                    width="100%"
                  ></iframe>
                  <div className="absolute top-0 right-0 w-10 -m-5" onClick={() => setIsShowTerm(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="text-stone-700 hover:text-stone-900 cursor-pointer"
                    >
                      <path
                        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48zm86.63 272L320 342.63l-64-64l-64 64L169.37 320l64-64l-64-64L192 169.37l64 64l64-64L342.63 192l-64 64z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

