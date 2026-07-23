import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import bookingHeroImage from "../Assets/Gemini_Generated_Image_ei62snei62snei62-clean.png";
import API from "../Api/axios";
import { useEffect } from "react";



const HELP_CONTACTS = [
  { icon: PhoneIcon, label: "Phone", value: "1-800-123-4567" },
  { icon: EmailIcon, label: "Email", value: "support@abicare.com" },
  { icon: AccessTimeIcon, label: "Support Hours", value: "24/7 Available" },
];

const CONTACT_DETAILS = [
  { icon: LocationOnIcon, label: "Address", value: "Chennai, Tamil Nadu, India" },
  { icon: PhoneIcon, label: "Phone", value: "+91 7904019592" },
  { icon: EmailIcon, label: "Email", value: "abicare2000@gmail.com" },
  { icon: AccessTimeIcon, label: "Working Hours", value: "24 × 7 Emergency Services" },
];

const FAQS = [
  {
    question: "What is a Hospital Management System?",
    answer:
      "A Hospital Management System (HMS) is a software solution designed to streamline and automate various aspects of hospital operations, including patient records, appointment scheduling, billing, and resource management.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment through our website or mobile app. Simply select the doctor you want to see, choose a convenient time slot, and confirm your booking.",
  },
  {
    question: "What are the benefits of using ABI CARE?",
    answer:
      "Using ABI CARE offers several benefits, including convenient appointment booking, easy access to medical records, seamless communication with healthcare professionals, and efficient management of hospital services.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Yes, we take data security very seriously. All your personal and medical information is encrypted and stored securely in compliance with healthcare privacy regulations.",
  },
];

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#0F172A",
    color: "white",
    borderRadius: "8px",
    "& fieldset": { borderColor: "rgba(107,186,224,0.3)" },
    "&:hover fieldset": { borderColor: "#6BBAE0" },
    "&.Mui-focused fieldset": { borderColor: "#6BBAE0" },
  },
  "& .MuiInputLabel-root": { color: "#6BBAE0", fontWeight: 600 },
  "& .MuiInputLabel-root.Mui-focused": { color: "#6BBAE0" },
  "& input, & textarea": { color: "white" },
};

/**
 * Book Appointment (Applications) page.
 *
 * `onBookingSubmit(formData)` and `onEnquirySubmit(formData)` fire with the
 * form values on submit — wire these up to your backend.
 */
function Applications({ onBookingSubmit, onEnquirySubmit }) {
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    doctor : "",
    date: "",
    time: "",
    message: "",

  });

const [departments, setDepartments] = useState([]);
const [doctors, setDoctors] = useState([]);

const [department, setDepartment] = useState("");
const [setDoctor] = useState("");

  useEffect(() => {
  const fetchDepartments = async () => {
    try {
const response = await API.get(
  "/departments"
);

      setDepartments(response.data);
    } catch (error) {
      console.error("Failed to load departments:", error);
    }
  };

  fetchDepartments();
}, []);

useEffect(() => {
  if (!department) {
    setDoctors([]);
    return;
  }

  const fetchDoctors = async () => {
    try {
     const response = await API.get(
  `/doctors/department/${department}`
);
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchDoctors();
}, [department]);

  const [enquiry, setEnquiry] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleBookingChange = (field) => (e) =>
    setBooking((prev) => ({ ...prev, [field]: e.target.value }));

  const handleEnquiryChange = (field) => (e) =>
    setEnquiry((prev) => ({ ...prev, [field]: e.target.value }));

const handleBookingSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log(booking);
const response = await API.post(
  "/applications",
  booking
);
    console.log("Application Created:", response.data);

    alert("Appointment booked successfully!");

    // Reset form
    setBooking({
      name: "",
      email: "",
      phone: "",
      department: "",
      doctor: "",
      date: "",
      time: "",
      message: "",
    });

  } catch (error) {
    console.error("Booking Error:", error.response?.data);
  alert(error.response?.data?.message || "Failed to book appointment");
  }
};

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    onEnquirySubmit?.(enquiry);
  };

  return (
    <Box sx={{ backgroundColor: "#0F172A" }}>
      {/* HERO SECTION */}
      <Box sx={{ maxWidth: "1280px", mx: "auto", px: 8, py: 12 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, lg: 5.5 }}>
            <Box
              sx={{
                display: "inline-block",
                backgroundColor: "rgba(107,186,224,0.2)",
                color: "#6BBAE0",
                px: 4,
                py: 1.5,
                borderRadius: "999px",
                fontSize: "18px",
                fontWeight: "bold",
                border: "1px solid rgba(107,186,224,0.4)",
              }}
            >
              Book Appointment
            </Box>

            <Typography
              variant="h2"
              sx={{
                mt: 3,
                color: "white",
                fontWeight: "bold",
                fontSize: { xs: "40px", md: "56px" },
                lineHeight: 1.1,
              }}
            >
              Your Health Begins{" "}
              <Box component="span" sx={{ color: "#6BBAE0" }}>
                with the Right Doctor
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 4,
                color: "#D1D5DB",
                fontSize: "18px",
                lineHeight: 1.8,
              }}
            >
              Booking an appointment with a doctor has never been easier. Our
              user-friendly platform allows you to schedule appointments with
              healthcare professionals at your convenience. Whether you need
              a routine check-up or{" "}
              <Box component="span" sx={{ color: "#6BBAE0", fontWeight: 600 }}>
                specialized care
              </Box>
              , our system ensures a seamless booking experience.
            </Typography>

            <Typography
              sx={{
                mt: 3,
                color: "#F8B4C8",
                fontWeight: 600,
                fontSize: "20px",
              }}
            >
              Quick. Easy. Reliable.
            </Typography>

            <Box sx={{ mt: 5, display: "flex", flexWrap: "wrap", gap: 2.5 }}>
              <Button
                href="#booking-form"
                sx={{
                  backgroundColor: "#6BBAE0",
                  color: "#0F172A",
                  px: 3.5,
                  py: 1.5,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "white" },
                }}
              >
                Book Now
              </Button>

              <Button
                variant="outlined"
                href="doctors.html"
                sx={{
                  color: "#6BBAE0",
                  borderColor: "#6BBAE0",
                  borderWidth: "2px",
                  px: 3.5,
                  py: 1.5,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#6BBAE0",
                    color: "#0F172A",
                    borderWidth: "2px",
                  },
                }}
              >
                View Doctors
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 6.5 }}>
            <Box
              component="img"
              src={bookingHeroImage}
              alt="Book Appointment"
              sx={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
                borderRadius: "40px",
                border: "4px solid #6BBAE0",
                boxShadow: 6,
              }}
            />
          </Grid>
        </Grid>
      </Box>

   <Box
  id="booking-form"
  sx={{
    py: 10,
    display: "flex",
    justifyContent: "center",
    px: 2,
  }}
>
  <Box
    sx={{
      width: "100%",
      maxWidth: "1100px",
      borderRadius: "20px",
      overflow: "hidden",
      border: "1px solid rgba(107,186,224,0.25)",
      background:
        "linear-gradient(180deg,#111827 0%,#0F172A 100%)",
      boxShadow: "0 25px 60px rgba(0,0,0,.45)",
    }}
  >
    {/* Header */}
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        px: 4,
        borderBottom: "1px solid rgba(107,186,224,.15)",
      }}
    >
      <EventAvailableIcon
        sx={{
          fontSize: 42,
          color: "#6BBAE0",
          mb: 2,
        }}
      />

      <Typography
        variant="h3"
        sx={{
          color: "#fff",
          fontWeight: 700,
        }}
      >
        Book an{" "}
        <Box component="span" sx={{ color: "#6BBAE0" }}>
          Appointment
        </Box>
      </Typography>

      <Typography
        sx={{
          mt: 2,
          color: "#CBD5E1",
          fontSize: "1.05rem",
        }}
      >
        Fill in the details below and our team will confirm your
        appointment shortly.
      </Typography>
    </Box>

    {/* Form */}
    <Box
      component="form"
      onSubmit={handleBookingSubmit}
      sx={{
        p: { xs: 3, md: 5 },
      }}
    >
      <Grid container spacing={3}>
        {/* Name */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            label="Full Name"
            value={booking.name}
            onChange={handleBookingChange("name")}
            sx={textFieldSx}
          />
        </Grid>

        {/* Email */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            type="email"
            label="Email Address"
            value={booking.email}
            onChange={handleBookingChange("email")}
            sx={textFieldSx}
          />
        </Grid>

        {/* Phone */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            type="tel"
            label="Phone Number"
            value={booking.phone}
            onChange={handleBookingChange("phone")}
            sx={textFieldSx}
          />
        </Grid>

        {/* Department */}
    {/* Department */}
<Grid size={{ xs: 12, md: 6 }}>
  <TextField
    select
    fullWidth
    required
    label="Department"
    value={booking.department}
    onChange={(e) => {
      setBooking({
        ...booking,
        department: e.target.value,
        doctor: "",
      });

      setDepartment(e.target.value); // Keep this if you use it to fetch doctors
      setDoctor("");
    }}
    sx={textFieldSx}
  >
    <MenuItem value="">Select Department</MenuItem>

    {departments.map((dept) => (
      <MenuItem key={dept._id} value={dept._id}>
        {dept.name}
      </MenuItem>
    ))}
  </TextField>
</Grid>

        {/* Doctor */}
{/* Doctor */}
<Grid size={{ xs: 12, md: 6 }}>
  <TextField
    select
    fullWidth
    required
    label="Doctor"
    value={booking.doctor}
    onChange={(e) => {
      setBooking({
        ...booking,
        doctor: e.target.value,
      });

      setDoctor(e.target.value);
    }}
    disabled={!department}
    sx={textFieldSx}
  >
    <MenuItem value="">Select Doctor</MenuItem>

    {doctors.map((doc) => (
      <MenuItem key={doc._id} value={doc._id}>
        {doc.name}
      </MenuItem>
    ))}
  </TextField>
</Grid>

        {/* Date */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            type="date"
            value={booking.date}
            onChange={handleBookingChange("date")}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              placeholder: "dd/mm/yyyy",
            }}
            sx={textFieldSx}
          />
        </Grid>

        {/* Time */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            type="time"
            value={booking.time}
            onChange={handleBookingChange("time")}
            InputLabelProps={{ shrink: true }}
            sx={textFieldSx}
          />
        </Grid>

        {/* Reason */}
        <Grid size={12}>
          <TextField
            fullWidth
            required
            multiline
            rows={5}
            label="Reason for Visit"
            value={booking.message}
            onChange={handleBookingChange("message")}
            sx={textFieldSx}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        startIcon={<EventAvailableIcon />}
        sx={{
          mt: 5,
          py: 2,
          maxWidth: "420px",
          mx: "auto",
          display: "flex",
          borderRadius: "10px",
          background:
            "linear-gradient(90deg,#3B82F6,#2563EB)",
          color: "#fff",
          fontWeight: 700,
          fontSize: "18px",
          textTransform: "none",
          boxShadow: "0 10px 30px rgba(37,99,235,.35)",
          "&:hover": {
            background:
              "linear-gradient(90deg,#60A5FA,#3B82F6)",
          },
        }}
      >
        Book Appointment
      </Button>

      <Typography
        sx={{
          mt: 2,
          color: "#94A3B8",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <LockIcon
          sx={{
            color: "#6BBAE0",
            fontSize: 17,
          }}
        />
        Your information is secure and confidential
      </Typography>
    </Box>
  </Box>
</Box>

      {/* NEED HELP SECTION */}
      <Box sx={{ borderTop: "1px solid #1E293B", py: 10 }}>
        <Box sx={{ maxWidth: "1280px", mx: "auto", px: 8 }}>
          <Grid container spacing={8} alignItems="flex-start">
            {/* Left Side */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "inline-block",
                  backgroundColor: "rgba(107,186,224,0.2)",
                  color: "#6BBAE0",
                  px: 3,
                  py: 1,
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  border: "1px solid rgba(107,186,224,0.4)",
                }}
              >
                Support
              </Box>

              <Typography
                variant="h4"
                sx={{ mt: 3, color: "white", fontWeight: "bold" }}
              >
                Need <Box component="span" sx={{ color: "#6BBAE0" }}>Help?</Box>
              </Typography>

              <Typography sx={{ mt: 1.5, color: "#F8B4C8", fontWeight: 600, fontSize: "20px" }}>
                Contact Our Support Team
              </Typography>

              <Typography sx={{ mt: 3, color: "#D1D5DB", lineHeight: 1.8 }}>
                If you have any questions or need assistance with booking an
                appointment, our support team is here to help. You can reach
                us via email, phone, or through our online contact form. We
                are committed to providing you with the support you need to
                ensure a smooth and hassle-free experience.
              </Typography>

              <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                {HELP_CONTACTS.map(({ icon: Icon, label, value }) => (
                  <Box
                    key={label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      backgroundColor: "#1E293B",
                      p: 2,
                      borderRadius: "8px",
                      border: "1px solid rgba(107,186,224,0.2)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        backgroundColor: "rgba(107,186,224,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ color: "#6BBAE0" }} />
                    </Box>
                    <Box>
                      <Typography sx={{ color: "#94A3B8", fontSize: "14px" }}>
                        {label}
                      </Typography>
                      <Typography sx={{ color: "white", fontWeight: 600 }}>
                        {value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Right Side - FAQ */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "inline-block",
                  backgroundColor: "rgba(107,186,224,0.2)",
                  color: "#6BBAE0",
                  px: 3,
                  py: 1,
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  border: "1px solid rgba(107,186,224,0.4)",
                }}
              >
                FAQ
              </Box>

              <Typography
                variant="h4"
                sx={{ mt: 3, color: "white", fontWeight: "bold" }}
              >
                Frequently Asked{" "}
                <Box component="span" sx={{ color: "#6BBAE0" }}>
                  Questions
                </Box>
              </Typography>

              <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                {FAQS.map((faq) => (
                  <Accordion
                    key={faq.question}
                    sx={{
                      backgroundColor: "#1E293B",
                      color: "white",
                      border: "1px solid rgba(107,186,224,0.2)",
                      borderRadius: "8px !important",
                      "&::before": { display: "none" },
                      "&.Mui-expanded": { margin: 0 },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: "#6BBAE0" }} />}
                      sx={{
                        "& .MuiAccordionSummary-content": {
                          fontWeight: 600,
                        },
                        "&:hover": { color: "#6BBAE0" },
                      }}
                    >
                      {faq.question}
                    </AccordionSummary>
                    <AccordionDetails sx={{ color: "#D1D5DB", lineHeight: 1.7 }}>
                      {faq.answer}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* ENQUIRY & CONTACT SECTION */}
      <Box sx={{ borderTop: "1px solid #1E293B", py: 10 }}>
        <Box sx={{ maxWidth: "1280px", mx: "auto", px: 8 }}>
          <Grid container spacing={8}>
            {/* Enquiry Form */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "inline-block",
                  backgroundColor: "rgba(107,186,224,0.2)",
                  color: "#6BBAE0",
                  px: 3,
                  py: 1,
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  border: "1px solid rgba(107,186,224,0.4)",
                }}
              >
                Get In Touch
              </Box>

              <Typography
                variant="h4"
                sx={{ mt: 3, color: "white", fontWeight: "bold" }}
              >
                Enquire About{" "}
                <Box component="span" sx={{ color: "#6BBAE0" }}>
                  Our Services
                </Box>
              </Typography>

              <Typography sx={{ mt: 2, color: "#D1D5DB", lineHeight: 1.8 }}>
                If you have any questions, comments, or feedback regarding
                our services, we encourage you to reach out to us. Your input
                is invaluable in helping us improve our platform and provide
                the best possible experience for our users.
              </Typography>

              <Box
                component="form"
                onSubmit={handleEnquirySubmit}
                sx={{
                  mt: 4,
                  backgroundColor: "#1E293B",
                  borderRadius: "16px",
                  p: 4,
                  border: "1px solid rgba(107,186,224,0.2)",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <TextField
                    fullWidth
                    required
                    label="Full Name"
                    value={enquiry.name}
                    onChange={handleEnquiryChange("name")}
                    sx={textFieldSx}
                  />

                  <TextField
                    fullWidth
                    required
                    type="email"
                    label="Email Address"
                    value={enquiry.email}
                    onChange={handleEnquiryChange("email")}
                    sx={textFieldSx}
                  />

                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={4}
                    label="Your Message"
                    value={enquiry.message}
                    onChange={handleEnquiryChange("message")}
                    sx={textFieldSx}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    startIcon={<SendIcon />}
                    sx={{
                      backgroundColor: "#6BBAE0",
                      color: "#0F172A",
                      py: 1.5,
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "white" },
                    }}
                  >
                    Submit Enquiry
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Contact Information */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "inline-block",
                  backgroundColor: "rgba(107,186,224,0.2)",
                  color: "#6BBAE0",
                  px: 3,
                  py: 1,
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  border: "1px solid rgba(107,186,224,0.4)",
                }}
              >
                Contact
              </Box>

              <Typography
                variant="h4"
                sx={{ mt: 3, color: "white", fontWeight: "bold" }}
              >
                Get in Touch with{" "}
                <Box component="span" sx={{ color: "#6BBAE0" }}>
                  ABI CARE
                </Box>
              </Typography>

              <Typography sx={{ mt: 1.5, color: "#F8B4C8", fontWeight: 600, fontSize: "20px" }}>
                We're Here to Answer Your Questions
              </Typography>

              <Typography sx={{ mt: 3, color: "#D1D5DB", lineHeight: 1.8 }}>
                If you have any questions, concerns, or feedback, please
                don't hesitate to reach out to us. Our dedicated support team
                is available to assist you with any inquiries you may have
                regarding our services, appointments, or healthcare
                management solutions.
              </Typography>

              <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                {CONTACT_DETAILS.map(({ icon: Icon, label, value }) => (
                  <Box
                    key={label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      backgroundColor: "#1E293B",
                      p: 2.5,
                      borderRadius: "12px",
                      border: "1px solid rgba(107,186,224,0.2)",
                      transition: "border-color 0.3s",
                      "&:hover": { borderColor: "#6BBAE0" },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        backgroundColor: "rgba(107,186,224,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ color: "#6BBAE0", fontSize: 26 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ color: "#94A3B8", fontSize: "14px" }}>
                        {label}
                      </Typography>
                      <Typography sx={{ color: "white", fontWeight: 600 }}>
                        {value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Button
                href="#booking-form"
                fullWidth
                startIcon={<SendIcon />}
                sx={{
                  mt: 4,
                  backgroundColor: "rgba(107,186,224,0.2)",
                  color: "#6BBAE0",
                  px: 3.5,
                  py: 1.5,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: "bold",
                  border: "1px solid rgba(107,186,224,0.4)",
                  "&:hover": {
                    backgroundColor: "#6BBAE0",
                    color: "#0F172A",
                  },
                }}
              >
                Submit Enquiry
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Applications;