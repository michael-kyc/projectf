import React, { useState } from "react";
import DropDown from "@/components/Elements/DropDown/DropDown";

const AddSchemaModal = ({ isOpen, onClose }) => {
    const [criteriaCount, setCriteriaCount] = useState([{ id: 1, criteria: "", equal: "", value: "" }]);
    const [rulesCount, setRulesCount] = useState([{ id: 1, rule: "" }]);

    const assetOptions = [
        { label: 'BTC', value: 'btc' },
        { label: 'ETH', value: 'eth' },
        { label: 'USD', value: 'usd' },
    ];

    const activityOptions = [
        { label: 'Transaction', value: 'transaction' },
        { label: 'Transfer', value: 'transfer' },
    ];

    const feeOptions = [
        { label: 'Select Fee', value: '' },
        { label: 'Fixed', value: 'fixed' },
        { label: 'Percentage', value: 'percentage' },
    ];

    const criteriaOptions = [
        { label: 'Criteria A', value: 'criteria_a' },
        { label: 'Criteria B', value: 'criteria_b' },
        { label: 'Criteria C', value: 'criteria_c' },
    ];

    const ruleOptions = [
        { label: 'Rule A', value: 'rule_a' },
        { label: 'Rule B', value: 'rule_b' },
        { label: 'Rule C', value: 'rule_c' },
    ];

    // Handler for adding new criteria
    const addCriteria = () => {
        setCriteriaCount([...criteriaCount, { id: criteriaCount.length + 1, criteria: "", equal: "", value: "" }]);
    };

    // Handler for removing criteria
    const removeCriteria = (index) => {
        const newCriteria = criteriaCount.filter((_, i) => i !== index);
        setCriteriaCount(newCriteria);
    };

    // Handler for adding new rules
    const addRule = () => {
        setRulesCount([...rulesCount, { id: rulesCount.length + 1, rule: "" }]);
    };

    // Handler for removing rules
    const removeRule = (index) => {
        const newRules = rulesCount.filter((_, i) => i !== index);
        setRulesCount(newRules);
    };

    // Conditionally render modal
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl w-8/12 shadow-lg  relative">

                <div className="flex justify-between items-center  h-16 p-6 bg-gray-100   rounded-tl-lg rounded-tr-lg">
                    <h2 className="text-xl text-textBlack font-medium">Add Fee Scheme</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <span className="text-xl border border-gray-100 rounded-full">&times;</span>
                    </button>

                </div>


                {/* Form fields */}
                <div className="grid grid-cols-3 gap-3 px-6 py-4">
                    {/* First row: Asset Type, Activity, Fee */}
                    <DropDown
                        items={assetOptions}
                        className="w-full"
                        title="Select Asset Type"
                    />
                    <DropDown
                        items={activityOptions}
                        className="w-full"
                        title="Select Activity"
                    />
                    <DropDown
                        items={feeOptions}
                        className="w-full"
                        title="Select Fee"
                    />
                </div>

                <div className="grid grid-cols-3 gap-3  px-6">
                    {/* Second row: Start Time, End Time, Gas Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input
                            type="date"
                            className="mt-1 pl-2 block w-full h-12 rounded-2xl border border-gray-200"
                            defaultValue="2000-09-10"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Time</label>
                        <input
                            type="date"
                            className="mt-1 block w-full h-12  rounded-2xl pl-2  border border-gray-200"
                            defaultValue="2024-08-20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gas Price</label>
                        <input
                            type="text"
                            placeholder="Gas Price"
                            className="mt-1 block w-full h-12 pl-2 rounded-xl border border-gray-200"
                        />
                    </div>
                </div>

                {/* Criteria section */}
                <div className="px-6 py-4">
                    <label className="block text-sm font-medium text-gray-700">Criteria</label>
                    {criteriaCount.map((criteria, index) => (
                        <div key={criteria.id} className="flex items-center space-x-3 ">
                            <DropDown
                                items={criteriaOptions}
                                className="flex-1 w-full"
                                title="Select Criteria"
                            />
                            <input
                                type="text"
                                placeholder="Equals"
                                className="flex-1 block w-full h-12 rounded-2xl pl-2 border border-gray-200"
                                value={criteria.equal}
                                onChange={(e) => {
                                    const newCriteria = [...criteriaCount];
                                    newCriteria[index].equal = e.target.value;
                                    setCriteriaCount(newCriteria);
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                className="flex-1 block w-full h-12 rounded-2xl pl-2 border border-gray-200"
                                value={criteria.value}
                                onChange={(e) => {
                                    const newCriteria = [...criteriaCount];
                                    newCriteria[index].value = e.target.value;
                                    setCriteriaCount(newCriteria);
                                }}
                            />
                            <button
                                onClick={() => removeCriteria(index)}
                                className="bg-red-500 text-white rounded-lg w-8 h-8 flex items-center justify-center"
                            >
                                &minus;
                            </button>
                            <button
                                onClick={addCriteria}
                                className="bg-black text-white rounded-lg w-8 h-8 flex items-center justify-center"
                            >
                                +
                            </button>
                        </div>
                    ))}
                </div>

                {/* Rules section */}
                <div className=" px-6 ">
                    <label className="block text-sm font-medium text-gray-700">Rules</label>
                    {rulesCount.map((rule, index) => (
                        <div key={rule.id} className="flex items-center space-x-3 ">
                            <DropDown
                                items={ruleOptions}
                                className="flex-1 w-full"
                                title="Select Rule"
                            />
                            <button
                                onClick={() => removeRule(index)}
                                className="bg-red-500 text-white rounded-lg w-8 h-8 flex items-center justify-center"
                            >
                                &minus;
                            </button>
                            <button
                                onClick={addRule}
                                className="bg-black text-white rounded-lg w-8 h-8 flex items-center justify-center"
                            >
                                +
                            </button>
                        </div>
                    ))}
                </div>

                {/* Footer buttons */}
                <div className="flex justify-end space-x-3 px-6 mt-4 mb-2 h-10">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-sm border rounded-xl border-gray-300  shadow-sm text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button className="px-5 w-20 py-2 text-sm rounded-xl bg-black text-white  shadow-sm hover:bg-gray-800">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSchemaModal;
