import { useState } from "react";
import { useCheckout } from "../../context/CheckoutContext";
import ErrorMessage from "../ErrorMessage";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

function AddressForm({ onNext }) {
  const { address: savedAddress, setAddress } = useCheckout();

  const [formData, setFormData] = useState(() => {
    if (savedAddress) {
      return { ...initialForm, ...savedAddress };
    }
    return { ...initialForm };
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      newErrors.phone = "Phone number is required.";
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
    }

    const pin = formData.pincode.replace(/\D/g, "");
    if (!pin) {
      newErrors.pincode = "Pincode is required.";
    } else if (pin.length !== 6) {
      newErrors.pincode = "Enter a valid 6-digit pincode.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const cleanAddress = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.replace(/\D/g, ""),
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      pincode: formData.pincode.replace(/\D/g, ""),
    };

    setAddress(cleanAddress);
    onNext(cleanAddress);
  };

  const isFieldInvalid = (field) => Boolean(errors[field]);

  const inputClass =
    "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 text-slate-900";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <ErrorMessage message={submitError} />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={inputClass}
          />
          {isFieldInvalid("name") && (
            <p className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass}
          />
          {isFieldInvalid("email") && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
          maxLength={10}
          placeholder="10-digit phone number"
          className={inputClass}
        />
        {isFieldInvalid("phone") && (
          <p className="mt-1 text-sm text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="address" className={labelClass}>
          Delivery Address
        </label>
        <textarea
          id="address"
          name="address"
          rows="4"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your full delivery address"
          className={`${inputClass} resize-none`}
        />
        {isFieldInvalid("address") && (
          <p className="mt-1 text-sm text-red-600">
            {errors.address}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className={labelClass}>
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="Chennai"
            className={inputClass}
          />
          {isFieldInvalid("city") && (
            <p className="mt-1 text-sm text-red-600">
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="state" className={labelClass}>
            State
          </label>
          <input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            placeholder="Tamil Nadu"
            className={inputClass}
          />
          {isFieldInvalid("state") && (
            <p className="mt-1 text-sm text-red-600">
              {errors.state}
            </p>
          )}
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="pincode" className={labelClass}>
          Pincode
        </label>
        <input
          id="pincode"
          name="pincode"
          type="text"
          value={formData.pincode}
          onChange={handleChange}
          maxLength={6}
          placeholder="600001"
          className={inputClass}
        />
        {isFieldInvalid("pincode") && (
          <p className="mt-1 text-sm text-red-600">
            {errors.pincode}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Continue to Payment
      </button>
    </form>
  );
}

export default AddressForm;
