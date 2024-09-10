import  { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { RootState, AppDispatch } from "../redux/store";
import { setFormField, setEndDate } from "../redux/slices/bookingSlice";

export default function BookingForm() {
  const { state } = useLocation();
  const { pkg, selectedDate } = state || {};

  const dispatch = useDispatch<AppDispatch>();
  const form = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    if (pkg) {
      dispatch(setFormField({ field: "startDate", value: selectedDate || "" }));
      dispatch(setEndDate(calculateEndDate(selectedDate || "", pkg.duration)));
    }
  }, [pkg, selectedDate, dispatch]);

  const calculateEndDate = (startDate: string, duration: string) => {
    const start = new Date(startDate);
    const durationDays = parseInt(duration);
    const end = new Date(start);
    end.setDate(start.getDate() + durationDays);
    return end.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (form.startDate && pkg?.duration) {
      const durationInDays = parseInt(pkg.duration);
      const endDate = calculateEndDate(
        form.startDate,
        durationInDays.toString()
      );
      dispatch(setEndDate(endDate));
    }
  }, [form.startDate, pkg?.duration, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFormField({
        field: e.target.name as keyof typeof form,
        value: e.target.value,
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Phone number validation: Should be exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    // Email validation using basic regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name || !form.email || !form.startDate || !form.endDate) {
      toast.error("Please fill out all fields");
      return;
    }

    if (!phoneRegex.test(form.phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success(
      `Booking submitted for ${form.name} from ${form.startDate} to ${form.endDate}`
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Booking Form for {pkg?.destination}
      </h2>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Phone no.</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="1234567890"
          />
        </div>
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">End Date</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            readOnly
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
