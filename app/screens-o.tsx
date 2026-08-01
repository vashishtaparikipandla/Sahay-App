'use client';
import React, { useState } from 'react';
import { useRouter } from './context';
import { 
  AppHeader, Btn, InfoCard 
} from './components';
import { 
  Scale, MessageCircleQuestion, AlertTriangle, ShieldCheck 
} from 'lucide-react';

// =============================================
//  O2 — DISCLOSURE TIMING ASSISTANT
// =============================================
export function DisclosureAssistantScreen() {
  const { back } = useRouter();
  const [step, setStep] = useState(0); // 0: Intro, 1: Compare, 2: Legal, 3: Reflection
  const [reflection, setReflection] = useState<string | null>(null);

  return (
    <div className="screen">
      <AppHeader title="When to Disclose" showBack />
      
      <div className="screen-content" style={{ padding: '24px 16px', paddingBottom: 100 }}>
        
        {step === 0 && (
          <div className="fade-in">
            <div style={{ width: 56, height: 56, borderRadius: 28, background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <Scale size={28} />
            </div>
            <h2 className="text-h2" style={{ marginBottom: 12 }}>There's no single right answer here.</h2>
            <p className="text-body text-medium" style={{ marginBottom: 32, lineHeight: 1.5 }}>
              Deciding when to share your disability with an employer is a personal choice. We're here to walk you through what each timing looks like, so you can decide what works best for you.
            </p>
            <Btn onClick={() => setStep(1)}>Walk me through it</Btn>
          </div>
        )}

        {step === 1 && (
          <div className="fade-in">
            <h3 className="text-h3" style={{ marginBottom: 16 }}>Compare the Timings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: 16, border: '1px solid var(--surface)', borderRadius: 12, background: 'var(--base)' }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--text-high)' }}>1. Before applying (on your profile)</h4>
                <p style={{ fontSize: 14, color: 'var(--text-medium)', marginBottom: 12 }}>You disclose upfront on your resume or Sahay profile.</p>
                <div style={{ fontSize: 14, background: 'var(--surface)', padding: 12, borderRadius: 8 }}>
                  <strong>Enables:</strong> Accommodations can be arranged before the first interview. Filters out employers who aren't inclusive early on.
                </div>
              </div>
              <div style={{ padding: 16, border: '1px solid var(--surface)', borderRadius: 12, background: 'var(--base)' }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--text-high)' }}>2. At the offer stage</h4>
                <p style={{ fontSize: 14, color: 'var(--text-medium)', marginBottom: 12 }}>You disclose after passing interviews, right when they make an offer.</p>
                <div style={{ fontSize: 14, background: 'var(--surface)', padding: 12, borderRadius: 8 }}>
                  <strong>Enables:</strong> You prove your skills first without facing unconscious bias during interviews, but you can still request workplace accommodations before day one.
                </div>
              </div>
              <div style={{ padding: 16, border: '1px solid var(--surface)', borderRadius: 12, background: 'var(--base)' }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--text-high)' }}>3. After joining</h4>
                <p style={{ fontSize: 14, color: 'var(--text-medium)', marginBottom: 12 }}>You disclose only when you need an accommodation on the job.</p>
                <div style={{ fontSize: 14, background: 'var(--surface)', padding: 12, borderRadius: 8 }}>
                  <strong>Enables:</strong> Maximum privacy during the hiring process. But requesting structural accommodations later may take time to implement.
                </div>
              </div>
            </div>
            <Btn onClick={() => setStep(2)} style={{ marginTop: 24 }}>Next: Legal Protections</Btn>
          </div>
        )}

        {step === 2 && (
          <div className="fade-in">
            <div style={{ background: '#EFF6FF', color: '#1D4ED8', padding: '12px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600, marginBottom: 24, display: 'flex', gap: 12 }}>
              <ShieldCheck size={20} />
              This is general guidance, not legal advice.
            </div>
            <h3 className="text-h3" style={{ marginBottom: 16 }}>Your Legal Protections</h3>
            <p className="text-body" style={{ marginBottom: 16, color: 'var(--text-medium)' }}>
              Under the <strong>RPwD Act, 2016</strong> in India, you are protected regardless of when you choose to disclose:
            </p>
            <ul style={{ paddingLeft: 20, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--text-high)', fontSize: 15, lineHeight: 1.5 }}>
              <li><strong>Anti-Discrimination:</strong> An employer cannot legally deny you a job or promotion simply because of your disability if you are qualified for the role.</li>
              <li><strong>Reasonable Accommodation:</strong> Employers are legally required to provide necessary adjustments to help you do your job.</li>
              <li><strong>Confidentiality:</strong> If you disclose your disability to HR, they must keep your medical information private.</li>
            </ul>
            <Btn onClick={() => setStep(3)}>Next step</Btn>
          </div>
        )}

        {step === 3 && (
          <div className="fade-in">
            <h3 className="text-h3" style={{ marginBottom: 16 }}>What matters most to you right now?</h3>
            <p className="text-body text-medium" style={{ marginBottom: 24 }}>This is just for you to reflect. We won't save this or show it to employers.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {['Privacy', 'Getting accommodations sorted early', 'Avoiding bias', 'Not sure yet'].map(chip => (
                <button
                  key={chip}
                  onClick={() => setReflection(chip)}
                  style={{
                    padding: '16px',
                    borderRadius: 12,
                    border: `2px solid ${reflection === chip ? 'var(--primary)' : 'var(--surface)'}`,
                    background: reflection === chip ? 'var(--primary-light)' : 'var(--base)',
                    color: reflection === chip ? 'var(--primary)' : 'var(--text-high)',
                    fontWeight: reflection === chip ? 600 : 500,
                    textAlign: 'left',
                    fontSize: 16
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>

            {reflection && (
              <div style={{ padding: 16, background: 'var(--surface)', borderRadius: 12, marginBottom: 24, fontSize: 14, color: 'var(--text-high)', lineHeight: 1.5 }}>
                {reflection === 'Privacy' && "People who lead with privacy often find disclosing after joining gives them what they're looking for — but it's genuinely your call."}
                {reflection === 'Getting accommodations sorted early' && "People who prioritize early accommodations often find disclosing before applying works best — but it's genuinely your call."}
                {reflection === 'Avoiding bias' && "People who want to avoid early bias often disclose at the offer stage — but it's genuinely your call."}
                {reflection === 'Not sure yet' && "That's completely okay. Take your time. You can revisit this guide whenever you need to."}
              </div>
            )}

            <Btn onClick={back} disabled={!reflection}>I'm done exploring</Btn>
            {!reflection && <button onClick={back} style={{ width: '100%', padding: 16, background: 'none', border: 'none', color: 'var(--text-medium)', fontWeight: 600, marginTop: 8 }}>Skip reflection</button>}
          </div>
        )}

      </div>
    </div>
  );
}

// =============================================
//  O3 — RED FLAGS / SCAM AWARENESS
// =============================================
export function RedFlagsScreen() {
  return (
    <div className="screen">
      <AppHeader title="Know the Red Flags" showBack />
      
      <div className="screen-content" style={{ padding: '24px 16px', paddingBottom: 40 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
          <AlertTriangle size={28} color="var(--error)" />
          <h2 className="text-h2">Stay Safe from Scams</h2>
        </div>
        
        <p className="text-body text-medium" style={{ marginBottom: 32, lineHeight: 1.5 }}>
          Unfortunately, some scammers target job seekers with disabilities. Here are the most common warning signs to watch out for.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ padding: 16, border: '1px solid var(--error-light)', borderRadius: 12, background: 'var(--base)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
              <AlertTriangle color="var(--error)" size={20} />
              <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--error)' }}>Asking for payment</h4>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-medium)', lineHeight: 1.5 }}>Legitimate employers will never ask you to pay a 'registration fee', 'training fee', or 'deposit' to get a job. If they ask for money, it is a scam.</p>
          </div>

          <div style={{ padding: 16, border: '1px solid var(--error-light)', borderRadius: 12, background: 'var(--base)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
              <AlertTriangle color="var(--error)" size={20} />
              <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--error)' }}>Asking for your Aadhaar or UDID directly</h4>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-medium)', lineHeight: 1.5 }}>Sahay already verifies your identity. Employers should not ask you to send your Aadhaar or UDID number in chat. Only provide this during official HR onboarding after signing an offer.</p>
          </div>

          <div style={{ padding: 16, border: '1px solid var(--error-light)', borderRadius: 12, background: 'var(--base)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
              <AlertTriangle color="var(--error)" size={20} />
              <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--error)' }}>Guaranteed job promises</h4>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-medium)', lineHeight: 1.5 }}>If someone messages you saying you are 'selected' without an interview, or guarantees you a job, it is highly likely a scam.</p>
          </div>

          <div style={{ padding: 16, border: '1px solid var(--error-light)', borderRadius: 12, background: 'var(--base)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
              <AlertTriangle color="var(--error)" size={20} />
              <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--error)' }}>Asking for bank details early</h4>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-medium)', lineHeight: 1.5 }}>Never share your bank account, UPI PIN, or OTPs during an interview. Bank details are only needed after you have a signed official offer letter.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
