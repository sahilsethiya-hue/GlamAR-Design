import { useState, useEffect } from "react";
import { ArrowLeft, MoreVertical, X, Copy, Trash2 } from "lucide-react";
import { DD, Inp, UBox } from "../../shared/ui";
import { S } from "../../shared/constants.jsx";
import { Toast } from "../../shared/ui";

const STYLIST_TYPES = [
  { type: "Eyewear Stylist", subtitle: "Frame and lens recommendations" },
  { type: "Makeup Stylist", subtitle: "Looks and color guidance" },
  { type: "AI Personal Stylist", subtitle: "Personalized beauty and fashion insights" },
];

const CREATE_APP_STEPS = [
  { key: "appDetails", label: "App Details" },
  { key: "instructionsQuestions", label: "Instruction & Questions" },
  { key: "reportSetup", label: "Report Setup" },
  { key: "appAppearance", label: "App Appearance" },
];

const DEFAULT_ROUTINE_QUESTIONS = [
  { id: "q1", code: "Q1", prompt: "What is your skin type?", type: "Single Select", required: true },
  { id: "q2", code: "Q2", prompt: "What are your primary skin concerns?", type: "Multi Select", required: true },
  { id: "q3", code: "Q3", prompt: "What products are you currently using?", type: "Multi Select", required: false },
  { id: "q4", code: "Q4", prompt: "Do you use active ingredients like Retinol or AHA/BHA?", type: "Yes / No", required: false },
  { id: "q5", code: "Q5", prompt: "Do you wear sunscreen daily?", type: "Yes / No", required: true },
];

function makeCreateFlow(type) {
  return {
    type,
    currentStep: 0,
    appDetails: {
      name: "",
      storageDuration: "1 year",
      allowedDomains: "www.glamar.io/",
      sdkVersion: "Version 2.0",
      algorithmVersion: "Version 3.0",
      language: "English",
      watermark: true,
    },
    instruction: {
      enabled: true,
      bannerName: "face-scan-banner.png",
      headerText: "Instructions",
      lines: [
        "Ensure you are in a well-lit environment",
        "Remove glasses or any face coverings",
        "Avoid makeup for accurate results",
      ],
      loaderFacts: true,
      facts: [
        "Dehydrated skin is not always dry. Oily skin can be dehydrated too.",
        "Daily SPF helps protect skin from photoaging.",
        "Gentle cleansing can strengthen your skin barrier.",
        "Consistency matters more than adding too many products.",
      ],
    },
    questions: {
      enabled: true,
      items: DEFAULT_ROUTINE_QUESTIONS,
    },
    reportSetup: {
      reportType: "Basic",
      baseDetailsEnabled: true,
      logoName: "logo.png",
      showReportTitle: true,
      showSubtitle: false,
      showUserFaceImage: true,
      showFaceShape: true,
      showFrameShape: true,
      showFrameSize: true,
      showIntroSummary: true,
      showCompatibility: true,
      showCategoryTags: true,
      explanationLength: "Medium",
      explanationCopyLength: "Medium",
      explanationTone: "Friendly",
      showShapeOnly: false,
      occasionEnabled: true,
      occasionCount: 2,
      occasionShowFrameImage: true,
      occasionShowColorPalette: true,
      occasionShowExplanationCopy: true,
      occasionShowSuitability: true,
      occasionShowTags: true,
      detailFaceDataEnabled: true,
      detailFields: {
        PD: true,
        "Skin tone": true,
        "Eye shape": true,
        "Eye color": true,
        "Hair color": true,
        "Frame size": true,
        "Face shape": true,
        "Face width": true,
      },
    },
    appAppearance: {
      typography: "DM Sans",
      theme: "Custom",
      previewMode: "Preview",
      prompt: "",
    },
  };
}

export function AIStylistPage({ onFullscreenChange }) {
  const [apps, setApps] = useState([
    { id: "app-1", type: "Eyewear Stylist", name: "Applicant 01", date: "12 June 2025", appId: "5566778899", active: true },
    { id: "app-2", type: "Makeup Stylist", name: "Applicant 01", date: "12 June 2025", appId: "5566778899", active: true },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [createFlow, setCreateFlow] = useState(null);
  const [aiToast, setAiToast] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!aiToast) return undefined;
    const timer = setTimeout(() => setAiToast(null), 3500);
    return () => clearTimeout(timer);
  }, [aiToast]);

  useEffect(() => () => onFullscreenChange?.(false), [onFullscreenChange]);

  const openCreate = () => {
    setSelectedType("");
    setFormError("");
    setShowModal(true);
    onFullscreenChange?.(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError("");
    if (!createFlow) onFullscreenChange?.(false);
  };

  const handleContinueFromModal = () => {
    if (!selectedType) {
      setFormError("Please select a stylist type.");
      return;
    }
    setFormError("");
    setCreateFlow(makeCreateFlow(selectedType));
    setShowModal(false);
  };

  const updateFlowSection = (section, updates) => {
    setCreateFlow(prev => (prev ? { ...prev, [section]: { ...prev[section], ...updates } } : prev));
  };

  const updateQuestion = (id, updates) => {
    setCreateFlow(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        questions: {
          ...prev.questions,
          items: prev.questions.items.map(question => (question.id === id ? { ...question, ...updates } : question)),
        },
      };
    });
  };

  const addQuestion = () => {
    setCreateFlow(prev => {
      if (!prev) return prev;
      const nextIndex = prev.questions.items.length + 1;
      return {
        ...prev,
        questions: {
          ...prev.questions,
          items: [
            ...prev.questions.items,
            { id: `q-${Date.now()}`, code: `Q${nextIndex}`, prompt: "", type: "Single Select", required: false },
          ],
        },
      };
    });
  };

  const removeQuestion = (id) => {
    setCreateFlow(prev => {
      if (!prev || prev.questions.items.length <= 1) return prev;
      return {
        ...prev,
        questions: {
          ...prev.questions,
          items: prev.questions.items.filter(question => question.id !== id),
        },
      };
    });
  };

  const updateReportDetailField = (field) => {
    setCreateFlow(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        reportSetup: {
          ...prev.reportSetup,
          detailFields: {
            ...prev.reportSetup.detailFields,
            [field]: !prev.reportSetup.detailFields[field],
          },
        },
      };
    });
  };

  const toggleApp = (id) => setApps(prev => prev.map(a => (a.id === id ? { ...a, active: !a.active } : a)));

  const completion = createFlow ? {
    appDetails: Boolean(createFlow.appDetails.name.trim() && createFlow.appDetails.allowedDomains.trim()),
    instructionsQuestions: (!createFlow.instruction.enabled || createFlow.instruction.lines.filter(line => line.trim()).length >= 3)
      && (!createFlow.questions.enabled || (createFlow.questions.items.length >= 5 && createFlow.questions.items.every(question => question.prompt.trim()))),
    reportSetup: Boolean(createFlow.reportSetup.reportType),
    appAppearance: Boolean(createFlow.appAppearance.typography && createFlow.appAppearance.theme),
  } : {};

  const currentStepIndex = createFlow?.currentStep || 0;
  const currentStep = CREATE_APP_STEPS[currentStepIndex];
  const canMoveNext = createFlow ? completion[currentStep.key] : false;
  const canPublish = createFlow ? CREATE_APP_STEPS.every(step => completion[step.key]) : false;

  const goToStep = (stepIndex) => {
    setCreateFlow(prev => (prev ? { ...prev, currentStep: stepIndex } : prev));
    setFormError("");
  };

  const goPrevious = () => {
    setCreateFlow(prev => (prev ? { ...prev, currentStep: Math.max(prev.currentStep - 1, 0) } : prev));
    setFormError("");
  };

  const goNext = () => {
    if (!createFlow) return;
    if (!canMoveNext) {
      setFormError(`Please complete ${currentStep.label} before moving ahead.`);
      return;
    }
    setFormError("");
    setCreateFlow(prev => (prev ? { ...prev, currentStep: Math.min(prev.currentStep + 1, CREATE_APP_STEPS.length - 1) } : prev));
  };

  const handlePublish = () => {
    if (!createFlow) return;
    if (!canPublish) {
      setFormError("Please complete all sections before publishing the app.");
      return;
    }
    const created = {
      id: `app-${Date.now()}`,
      type: createFlow.type,
      name: createFlow.appDetails.name.trim(),
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
      appId: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      active: true,
    };
    setApps(prev => [created, ...prev]);
    setAiToast({ message: `"${created.name}" created successfully`, type: "success" });
    setCreateFlow(null);
    setFormError("");
    onFullscreenChange?.(false);
  };

  const typeColor = () => "#1a1a1a";

  const ToggleSwitch = ({ on, onToggle }) => (
    <div onClick={onToggle} style={{ width: 42, height: 22, borderRadius: 12, cursor: "pointer", background: on ? "#f43f5e" : "#d9d9d9", display: "flex", alignItems: "center", padding: 3, transition: "background 0.2s" }}>
      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "transform 0.2s", transform: on ? "translateX(20px)" : "translateX(0)", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
    </div>
  );

  const CardTitle = ({ title, subtitle }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 16, fontWeight: 700 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: "#8b8b8b", marginTop: 4 }}>{subtitle}</div>}
    </div>
  );

  const renderStepContent = () => {
    if (!createFlow) return null;

    if (currentStep.key === "appDetails") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ ...S.card, padding: 18, background: "#fff8fb", borderColor: "#f8d7e2", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12.5, color: "#7a5563" }}>Upgrade to access advanced skin analysis and exclusive tools</span>
            <button style={{ ...S.btnP, background: "#f43f5e", borderRadius: 20, padding: "8px 14px", fontSize: 12 }}>Upgrade plan</button>
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <CardTitle title="App details" subtitle={`Setup for ${createFlow.type}`} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
              <Inp label="App name" value={createFlow.appDetails.name} onChange={v => updateFlowSection("appDetails", { name: v })} placeholder="Enter app name" required />
              <div>
                <label style={S.label}>Data storage duration</label>
                <div style={{ border: "1px solid #e5e5e5", borderRadius: 10, padding: "10px 12px", display: "flex", gap: 20 }}>
                  {["None", "1 year", "3 year"].map(option => (
                    <label key={option} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, cursor: "pointer" }}>
                      <input type="radio" name="storageDuration" checked={createFlow.appDetails.storageDuration === option} onChange={() => updateFlowSection("appDetails", { storageDuration: option })} />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <Inp label="Allowed domains" value={createFlow.appDetails.allowedDomains} onChange={v => updateFlowSection("appDetails", { allowedDomains: v })} placeholder="www.example.com" required />
              <DD label="SDK version" value={createFlow.appDetails.sdkVersion} onChange={v => updateFlowSection("appDetails", { sdkVersion: v })} options={["Version 2.0", "Version 1.9"]} placeholder="Select SDK version" />
              <DD label="Algorithm version" value={createFlow.appDetails.algorithmVersion} onChange={v => updateFlowSection("appDetails", { algorithmVersion: v })} options={["Version 3.0", "Version 2.8"]} placeholder="Select algorithm version" />
              <DD label="Language support" value={createFlow.appDetails.language} onChange={v => updateFlowSection("appDetails", { language: v })} options={["English", "Hindi", "Spanish"]} placeholder="Select language" />
              <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12.5 }}>Show watermark on images</span>
                <ToggleSwitch on={createFlow.appDetails.watermark} onToggle={() => updateFlowSection("appDetails", { watermark: !createFlow.appDetails.watermark })} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep.key === "instructionsQuestions") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ ...S.card, padding: 18 }}>
            <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>Instruction</span>
              <ToggleSwitch on={createFlow.instruction.enabled} onToggle={() => updateFlowSection("instruction", { enabled: !createFlow.instruction.enabled })} />
            </div>
            {createFlow.instruction.enabled ? (
              <>
                <div style={{ marginBottom: 14 }}>
                  <label style={S.label}>Banner (1:1)</label>
                  <UBox label="Upload banner image" />
                  <div style={{ marginTop: 8, fontSize: 11.5, color: "#7f7f7f" }}>Uploaded: {createFlow.instruction.bannerName}</div>
                </div>
                <Inp label="Header text" value={createFlow.instruction.headerText} onChange={v => updateFlowSection("instruction", { headerText: v })} placeholder="Instructions" />
                <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                  {createFlow.instruction.lines.map((line, index) => (
                    <Inp key={`inst-${index}`} label={`Instruction ${index + 1}`} value={line} onChange={v => {
                      const nextLines = [...createFlow.instruction.lines];
                      nextLines[index] = v;
                      updateFlowSection("instruction", { lines: nextLines });
                    }} placeholder="Enter instruction" />
                  ))}
                </div>
                <div style={{ ...S.card, padding: 16, marginTop: 14, borderColor: "#ececec" }}>
                  <CardTitle title="Customize loader screen" subtitle="Show quick educational facts while AI analyzes results" />
                  <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12.5 }}>Loader facts</span>
                    <ToggleSwitch on={createFlow.instruction.loaderFacts} onToggle={() => updateFlowSection("instruction", { loaderFacts: !createFlow.instruction.loaderFacts })} />
                  </div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {createFlow.instruction.facts.map((fact, index) => (
                      <Inp key={`fact-${index}`} label={`Fact ${index + 1}`} value={fact} onChange={v => {
                        const nextFacts = [...createFlow.instruction.facts];
                        nextFacts[index] = v;
                        updateFlowSection("instruction", { facts: nextFacts });
                      }} placeholder="Enter loader fact" />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div style={{ fontSize: 12.5, color: "#8b8b8b" }}>Instruction is turned off for this app.</div>
            )}
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <CardTitle title="Routine intake questions" subtitle="Configure what users answer before AI builds their routine" />
            <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>Questions</span>
              <ToggleSwitch on={createFlow.questions.enabled} onToggle={() => updateFlowSection("questions", { enabled: !createFlow.questions.enabled })} />
            </div>
            {createFlow.questions.enabled ? (
              <>
                <div style={{ display: "grid", gap: 10 }}>
                  {createFlow.questions.items.map(question => (
                    <div key={question.id} style={{ border: "1px solid #ececec", borderRadius: 12, padding: 12, background: "#fff" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#f43f5e" }}>{question.code}</span>
                        <button onClick={() => removeQuestion(question.id)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }} title="Remove question">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <Inp value={question.prompt} onChange={v => updateQuestion(question.id, { prompt: v })} placeholder="Question" />
                      <div style={{ display: "grid", gridTemplateColumns: "170px 1fr auto", gap: 10, marginTop: 10, alignItems: "center" }}>
                        <DD value={question.type} onChange={v => updateQuestion(question.id, { type: v })} options={["Single Select", "Multi Select", "Yes / No"]} />
                        <span style={{ fontSize: 12.5, color: "#777" }}>{question.type}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 12, color: "#8a8a8a" }}>Required</span>
                          <ToggleSwitch on={question.required} onToggle={() => updateQuestion(question.id, { required: !question.required })} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{ ...S.btnO, width: "100%", justifyContent: "center", marginTop: 10 }} onClick={addQuestion}>+ Add Question</button>
                <div style={{ fontSize: 11.5, color: "#888", marginTop: 8 }}>Keep it to 5-7 questions for best completion rate.</div>
              </>
            ) : (
              <div style={{ fontSize: 12.5, color: "#8b8b8b" }}>Questions are turned off for this app.</div>
            )}
          </div>
        </div>
      );
    }

    if (currentStep.key === "reportSetup") {
      const chip = (active) => ({
        border: `1.5px solid ${active ? "#16a34a" : "#d8d8d8"}`,
        borderRadius: 10,
        background: active ? "#eafbea" : "#fff",
        padding: "7px 14px",
        fontSize: 12.5,
        fontWeight: 600,
        color: "#1a1a1a",
        cursor: "pointer",
      });

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ ...S.card, padding: 18 }}>
            <CardTitle title="Select report type" subtitle="Choose how detailed your generated report should be" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(120px, 1fr))", gap: 8 }}>
              {["Basic", "Professional", "Advance", "Custom"].map(type => (
                <button key={type} onClick={() => updateFlowSection("reportSetup", { reportType: type })} style={{ border: `1.5px solid ${createFlow.reportSetup.reportType === type ? "#f43f5e" : "#e5e5e5"}`, background: createFlow.reportSetup.reportType === type ? "#fff1f5" : "#fff", color: "#1a1a1a", borderRadius: 10, padding: "12px 10px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", textAlign: "left" }}>
                  <div style={{ fontWeight: 700, marginBottom: 3 }}>{type}</div>
                  <div style={{ fontSize: 11, color: "#777", lineHeight: 1.25 }}>
                    {type === "Basic" && "Only face shape + frame size"}
                    {type === "Professional" && "Shape + size + color"}
                    {type === "Advance" && "Shape + style + occasion + facial data"}
                    {type === "Custom" && "Customize every section manually"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <CardTitle title="Base report detail" />
              <ToggleSwitch on={createFlow.reportSetup.baseDetailsEnabled} onToggle={() => updateFlowSection("reportSetup", { baseDetailsEnabled: !createFlow.reportSetup.baseDetailsEnabled })} />
            </div>
            {createFlow.reportSetup.baseDetailsEnabled ? (
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
                  <button style={{ ...S.btnO, borderRadius: 8, padding: "6px 10px", fontSize: 12 }}>Logo</button>
                  <span style={{ fontSize: 12.5, color: "#666" }}>Upload logo here</span>
                </div>
                <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12.5 }}>Show report title</span>
                  <ToggleSwitch on={createFlow.reportSetup.showReportTitle} onToggle={() => updateFlowSection("reportSetup", { showReportTitle: !createFlow.reportSetup.showReportTitle })} />
                </div>
                <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12.5 }}>Show subtitle</span>
                  <ToggleSwitch on={createFlow.reportSetup.showSubtitle} onToggle={() => updateFlowSection("reportSetup", { showSubtitle: !createFlow.reportSetup.showSubtitle })} />
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 12.5, color: "#8b8b8b" }}>Base report detail is turned off.</div>
            )}
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <CardTitle title="Face Scan Hero Section" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                ["showUserFaceImage", "Show user face image"],
                ["showFaceShape", "Show face shape"],
                ["showFrameShape", "Show frame shape"],
                ["showFrameSize", "Show frame size"],
              ].map(([key, label]) => (
                <div key={key} style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12.5 }}>{label}</span>
                  <ToggleSwitch on={createFlow.reportSetup[key]} onToggle={() => updateFlowSection("reportSetup", { [key]: !createFlow.reportSetup[key] })} />
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1", border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12.5 }}>Show intro summary paragraph</span>
                <ToggleSwitch on={createFlow.reportSetup.showIntroSummary} onToggle={() => updateFlowSection("reportSetup", { showIntroSummary: !createFlow.reportSetup.showIntroSummary })} />
              </div>
            </div>
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <CardTitle title="Why this best suits you" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12.5 }}>Show compatibility %</span>
                <ToggleSwitch on={createFlow.reportSetup.showCompatibility} onToggle={() => updateFlowSection("reportSetup", { showCompatibility: !createFlow.reportSetup.showCompatibility })} />
              </div>
              <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12.5 }}>Show category tag</span>
                <ToggleSwitch on={createFlow.reportSetup.showCategoryTags} onToggle={() => updateFlowSection("reportSetup", { showCategoryTags: !createFlow.reportSetup.showCategoryTags })} />
              </div>
            </div>
            <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 12.5 }}>Explanation copy length</span>
              <div style={{ display: "flex", gap: 8 }}>
                {["Small", "Medium", "Large"].map(option => (
                  <button key={option} onClick={() => updateFlowSection("reportSetup", { explanationLength: option })} style={chip(createFlow.reportSetup.explanationLength === option)}>{option}</button>
                ))}
              </div>
            </div>
            <div style={{ border: "1px solid #ececec", borderRadius: 16, padding: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Explanation copy</div>
              <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 10, marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontSize: 12.5, color: "#666" }}>Length</span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Small", "Medium", "Large"].map(option => (
                    <button key={option} onClick={() => updateFlowSection("reportSetup", { explanationCopyLength: option })} style={chip(createFlow.reportSetup.explanationCopyLength === option)}>{option}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 10, alignItems: "start" }}>
                <span style={{ fontSize: 12.5, color: "#666", marginTop: 6 }}>Tone</span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Professional", "Friendly", "Premium", "Clinical", "Luxury retail"].map(tone => (
                    <button key={tone} onClick={() => updateFlowSection("reportSetup", { explanationTone: tone })} style={chip(createFlow.reportSetup.explanationTone === tone)}>{tone}</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #ececec", marginTop: 12, paddingTop: 12 }}>
              <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12.5 }}>Show only shape-based recommendation</span>
                <ToggleSwitch on={createFlow.reportSetup.showShapeOnly} onToggle={() => updateFlowSection("reportSetup", { showShapeOnly: !createFlow.reportSetup.showShapeOnly })} />
              </div>
            </div>
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <CardTitle title="Occasion-Based Looks" />
              <ToggleSwitch on={createFlow.reportSetup.occasionEnabled} onToggle={() => updateFlowSection("reportSetup", { occasionEnabled: !createFlow.reportSetup.occasionEnabled })} />
            </div>
            {createFlow.reportSetup.occasionEnabled ? (
              <>
                <div style={{ border: "1px solid #ececec", borderRadius: 10, padding: "10px 12px", display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 12.5 }}>Number of occasions to display</span>
                  <input type="number" min={1} max={5} value={createFlow.reportSetup.occasionCount} onChange={e => updateFlowSection("reportSetup", { occasionCount: Math.max(1, Math.min(5, Number(e.target.value) || 1)) })} style={{ ...S.input, width: 70, textAlign: "center", padding: "8px 10px" }} />
                </div>
                <div style={{ fontSize: 11.5, color: "#8a8a8a", marginTop: 6 }}>Note: You can&apos;t add more than 5</div>
                <div style={{ borderTop: "1px solid #ececec", marginTop: 12, paddingTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    ["occasionShowFrameImage", "Show frame image"],
                    ["occasionShowColorPalette", "Show color palette"],
                    ["occasionShowExplanationCopy", "Show explanation copy"],
                    ["occasionShowSuitability", "Show suitability %"],
                    ["occasionShowTags", "Show tags"],
                  ].map(([key, label]) => (
                    <div key={key} style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gridColumn: key === "occasionShowTags" ? "1 / 2" : "auto" }}>
                      <span style={{ fontSize: 12.5 }}>{label}</span>
                      <ToggleSwitch on={createFlow.reportSetup[key]} onToggle={() => updateFlowSection("reportSetup", { [key]: !createFlow.reportSetup[key] })} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ fontSize: 12.5, color: "#8b8b8b" }}>Occasion-based looks are turned off.</div>
            )}
          </div>

          <div style={{ ...S.card, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <CardTitle title="Detailed Face Data" />
              <ToggleSwitch on={createFlow.reportSetup.detailFaceDataEnabled} onToggle={() => updateFlowSection("reportSetup", { detailFaceDataEnabled: !createFlow.reportSetup.detailFaceDataEnabled })} />
            </div>
            {createFlow.reportSetup.detailFaceDataEnabled ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {Object.keys(createFlow.reportSetup.detailFields).map(field => (
                  <div key={field} style={{ border: "1px solid #ececec", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12.5 }}>{field}</span>
                    <ToggleSwitch on={createFlow.reportSetup.detailFields[field]} onToggle={() => updateReportDetailField(field)} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 12.5, color: "#8b8b8b" }}>Detailed face data section is turned off.</div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...S.card, padding: 18 }}>
          <CardTitle title="Typography" />
          <DD value={createFlow.appAppearance.typography} onChange={v => updateFlowSection("appAppearance", { typography: v })} options={["DM Sans", "Manrope", "Lato", "Poppins"]} placeholder="Select typography" />
        </div>

        <div style={{ ...S.card, padding: 18 }}>
          <CardTitle title="Choose theme" />
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            {["Light", "Dark", "Custom"].map(theme => (
              <button key={theme} onClick={() => updateFlowSection("appAppearance", { theme })} style={{ border: `1.5px solid ${createFlow.appAppearance.theme === theme ? "#f43f5e" : "#d8d8d8"}`, borderRadius: 10, background: createFlow.appAppearance.theme === theme ? "#fff1f5" : "#fff", padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {theme}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11.5, color: "#8a8a8a" }}>Preview/code toggle works when Custom theme is selected.</div>
        </div>

        {createFlow.appAppearance.theme === "Custom" && (
          <div style={{ ...S.card, padding: 18 }}>
            <CardTitle title="Custom theme AI assistant" subtitle="Add color tokens or website link and ask AI to generate a theme." />
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 14, padding: 14, minHeight: 210, background: "#fafafa", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#8a8a8a", fontSize: 16 }}>
              Chat
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8 }}>
              <input style={{ ...S.input }} value={createFlow.appAppearance.prompt} onChange={e => updateFlowSection("appAppearance", { prompt: e.target.value })} placeholder="Add your color tokens or website link" />
              <button style={{ ...S.btnO, padding: "10px 12px", borderRadius: 8 }}>Sonnet 4.6</button>
              <button style={{ ...S.btnP, padding: "10px 16px", borderRadius: 8 }}>Send</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (createFlow) {
    const isLastStep = currentStepIndex === CREATE_APP_STEPS.length - 1;

    return (
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <button onClick={() => { setCreateFlow(null); setFormError(""); onFullscreenChange?.(false); }} style={{ background: "none", border: "none", padding: 0, display: "flex", alignItems: "center", gap: 6, color: "#666", cursor: "pointer", fontSize: 13 }}>
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 style={{ fontSize: 31, fontWeight: 700, letterSpacing: -0.6 }}>Create app</h1>
        </div>

        {formError && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 13 }}>{formError}</div>
        )}

        <div style={{ ...S.card, padding: 14, background: "#f6f6f7" }}>
          <div style={{ display: "grid", gridTemplateColumns: "190px minmax(0,1fr) 240px", gap: 14, alignItems: "start" }}>
            <div style={{ ...S.card, padding: 12 }}>
              <div style={{ display: "grid", gap: 8 }}>
                {CREATE_APP_STEPS.map((step, index) => {
                  const isActive = currentStepIndex === index;
                  const isDone = completion[step.key];
                  return (
                    <button key={step.key} onClick={() => goToStep(index)} style={{ border: `1.5px solid ${isActive ? "#f43f5e" : isDone ? "#16a34a" : "#dadada"}`, background: isActive ? "#fff1f5" : "#fff", borderRadius: 10, padding: "10px 12px", fontSize: 13, textAlign: "left", fontWeight: isActive ? 700 : 600, color: "#1a1a1a", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span>{step.label}</span>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: isDone ? "#16a34a" : isActive ? "#f43f5e" : "#cfcfcf" }} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>{renderStepContent()}</div>

            <div style={{ ...S.card, padding: 12, position: "sticky", top: 12 }}>
              <div style={{ border: "1px solid #ececec", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
                <div style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0f0", fontSize: 12, fontWeight: 700 }}>SDK Preview</div>
                <div style={{ padding: 12 }}>
                  <div style={{ background: "#f6f6f6", borderRadius: 12, padding: 10, marginBottom: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{createFlow.appDetails.name || "Untitled app"}</div>
                    <div style={{ fontSize: 11, color: "#888" }}>{createFlow.type}</div>
                  </div>
                  <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Instructions to get started</div>
                    <div style={{ display: "grid", gap: 6 }}>
                      {createFlow.instruction.lines.slice(0, 3).map((line, index) => (
                        <div key={`preview-${index}`} style={{ fontSize: 11.5, color: "#666", lineHeight: 1.35 }}>{line || "Add instruction text"}</div>
                      ))}
                    </div>
                    <button style={{ marginTop: 10, width: "100%", border: "none", background: "#141414", color: "#fff", borderRadius: 18, padding: "8px 10px", fontSize: 12, fontWeight: 600 }}>Start scan</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <button onClick={goPrevious} disabled={currentStepIndex === 0} style={currentStepIndex === 0 ? { ...S.btnDisabled, borderRadius: 999, padding: "9px 16px" } : { ...S.btnO, borderRadius: 999, padding: "9px 16px" }}>
              Previous
            </button>
            {isLastStep ? (
              <button onClick={handlePublish} style={canPublish ? { ...S.btnP, background: "#f43f5e", borderRadius: 999, padding: "9px 18px" } : { ...S.btnDisabled, borderRadius: 999, padding: "9px 18px" }}>
                Publish App
              </button>
            ) : (
              <button onClick={goNext} style={canMoveNext ? { ...S.btnP, background: "#f43f5e", borderRadius: 999, padding: "9px 18px" } : { ...S.btnDisabled, borderRadius: 999, padding: "9px 18px" }}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>AI Stylist</h1>
      </div>

      <Toast toast={aiToast} onClose={() => setAiToast(null)} />

      <div style={{ ...S.card, padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>Your apps</span>
          <button style={{ ...S.btnO, borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600 }} onClick={openCreate}>
            Create App
          </button>
        </div>

        {apps.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#bbb" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✦</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#999" }}>No apps yet</div>
            <div style={{ fontSize: 13, color: "#bbb", marginTop: 6 }}>Click "Create App" to get started</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
            {apps.map(app => (
              <div key={app.id} style={{ border: "1.5px solid #e5e5e5", borderRadius: 16, padding: 20, background: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ border: "1.5px solid #1a1a1a", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 600, color: typeColor(app.type), background: "#fff" }}>{app.type}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center" }} title="Preview">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    </button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center" }} title="More options">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{app.name}</div>
                  <div style={{ fontSize: 12, color: "#999" }}>Created at {app.date}</div>
                </div>
                <div style={{ height: 1, background: "#f0f0f0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, color: "#888" }}>App ID</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#f43f5e", cursor: "pointer" }}>{app.appId}</span>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", padding: 0, lineHeight: 1, display: "flex" }} title="Copy App ID" onClick={() => navigator.clipboard?.writeText(app.appId)}>
                      <Copy size={13} />
                    </button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, color: app.active ? "#16a34a" : "#999", fontWeight: 600 }}>{app.active ? "Active" : "Inactive"}</span>
                    <div onClick={() => toggleApp(app.id)} style={{ width: 42, height: 24, borderRadius: 12, cursor: "pointer", background: app.active ? "#f43f5e" : "#d9d9d9", display: "flex", alignItems: "center", padding: 3, transition: "background 0.2s" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "transform 0.2s", transform: app.active ? "translateX(18px)" : "translateX(0)", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 20, width: 900, maxWidth: "95vw", boxShadow: "0 24px 64px rgba(0,0,0,0.18)", overflow: "hidden" }}>
            <div style={{ padding: "22px 28px", borderBottom: "1px solid #eaeaea", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>Choose AI stylist</div>
              <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#aaa" }}><X size={20} /></button>
            </div>
            <div style={{ padding: "22px 28px 12px" }}>
              {formError && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 13 }}>{formError}</div>
              )}
              <p style={{ fontSize: 13, color: "#777", marginBottom: 14 }}>Select one stylist to continue creating your app.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
                {STYLIST_TYPES.map(item => (
                  <div key={item.type} onClick={() => setSelectedType(item.type)} style={{ border: `2px solid ${selectedType === item.type ? "#f43f5e" : "#e5e5e5"}`, borderRadius: 18, padding: 12, cursor: "pointer", background: "#fff", transition: "all 0.15s", boxShadow: selectedType === item.type ? "0 0 0 2px #fff1f5 inset" : "none" }}>
                    <div style={{ borderRadius: 14, border: "1.5px solid #e7e7e7", minHeight: 160, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, position: "relative", background: "#fafafa" }}>
                      {selectedType === item.type && <div style={{ position: "absolute", top: 10, left: 10, width: 18, height: 18, borderRadius: "50%", background: "#f43f5e", border: "3px solid #fff", boxShadow: "0 0 0 1px #f43f5e" }} />}
                      <span style={{ fontSize: 18, color: "#b3b3b3", fontWeight: 700 }}>graphics</span>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>{item.type}</div>
                    <div style={{ fontSize: 12.5, color: "#888", marginTop: 4 }}>{item.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: "16px 28px", borderTop: "1px solid #eaeaea", display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button onClick={closeModal} style={{ ...S.btnO, borderRadius: 12, padding: "10px 18px" }}>Cancel</button>
              <button onClick={handleContinueFromModal} style={selectedType ? { ...S.btnP, background: "#141414", borderRadius: 12, padding: "10px 22px" } : { ...S.btnDisabled, borderRadius: 12, padding: "10px 22px" }}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
