import React from 'react'
import { RiCheckboxCircleFill} from "react-icons/ri";
const StepperHeader = ({title,subtitle,extraParameter1,extraParameter2,path}) => {
  return (
      <div className="bg-white dark:bg-secondary-dark-bg rounded-3xl shadow-sm border border-brand-cream/50 dark:border-gray-800 p-8 mb-10 transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
              {path.split("/").map((segment, index, arr) => (
                <span key={index} className="flex items-center gap-2">
                  <span
                    className={
                      index === arr.length - 1
                        ? "text-brand-burgundy dark:text-brand-cream font-bold"
                        : ""
                    }
                  >
                    {segment}
                  </span>
                  {index !== arr.length - 1 && <span>/</span>}
                </span>
              ))}
            </nav>
            <h2 className="text-4xl font-serif font-bold text-brand-burgundy dark:text-brand-cream">
              {title}
            </h2>
            <p className="mt-2 text-gray-500 italic font-serif">{subtitle}</p>
          </div>
          { title === "Order Confirmed" ? 
          <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 px-6 py-3 rounded-2xl border border-emerald-100 dark:border-emerald-800">
             <RiCheckboxCircleFill className="text-emerald-600 text-2xl" />
            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-bold">{extraParameter1}</p>
              <p className="font-mono text-emerald-900 dark:text-emerald-200">{extraParameter2}</p>
            </div>
          </div>:<></>}
        </div>
      </div>
    );
}

export default StepperHeader