'use client';

import { useEffect, useState } from 'react';
import { YAMLSchemaType } from '@/lib/types/yaml-schema';
import { FileText, Type, AlertCircle, Flag, User, Calendar, Clock, Settings, Wrench } from 'lucide-react';
import { format } from 'date-fns';

export default function Home() {
  const [schema, setSchema] = useState<YAMLSchemaType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [openSection, setOpenSection] = useState('basicInfo');

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await fetch('/api/schema');
        if (!response.ok) throw new Error('Failed to fetch schema');
        const data = await response.json();
        setSchema(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchSchema();
  }, []);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!schema) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading schema...</div>
      </div>
    );
  }

  const headerItems = [
    { icon: FileText, label: 'Project Key', value: schema.projectKey, iconClass: 'text-yellow-500 bg-yellow-50' },
    { icon: Type, label: 'Issue Type', value: schema.issueType, iconClass: 'text-blue-500 bg-blue-50' },
    { icon: AlertCircle, label: 'Status', value: schema.status, iconClass: 'text-yellow-600 bg-yellow-50' },
    { icon: Flag, label: 'Priority', value: schema.priority, iconClass: 'text-blue-600 bg-blue-50' },
    { icon: User, label: 'Reporter', value: schema.reporter, iconClass: 'text-yellow-500 bg-yellow-50' },
    { 
      icon: Calendar, 
      label: 'Created', 
      value: format(new Date(schema.createdAt), 'PPP p'), 
      iconClass: 'text-blue-500 bg-blue-50' 
    },
    { 
      icon: Clock, 
      label: 'Updated', 
      value: format(new Date(schema.updatedAt), 'PPP p'), 
      iconClass: 'text-gray-500 bg-gray-50' 
    }
  ];

  const sections = {
    basicInfo: { title: 'Basic Information', icon: User, iconClass: 'text-yellow-500 bg-yellow-50' },
    settings: { title: 'Settings', icon: Settings, iconClass: 'text-blue-500 bg-blue-50' },
    advanced: { title: 'Advanced Options', icon: Wrench, iconClass: 'text-gray-500 bg-gray-50' }
  };

  const groupedFields = schema.fields.reduce((acc, field) => {
    const section = field.section || 'basicInfo';
    if (!acc[section]) acc[section] = [];
    acc[section].push(field);
    return acc;
  }, {} as Record<string, typeof schema.fields>);

  const renderField = (field: (typeof schema.fields)[0]) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      onChange: (e: any) => handleInputChange(field.name, e.target.value),
      className: 'w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500',
      placeholder: field.description,
      value: formData[field.name] || '',
    };

    switch (field.type) {
      case 'string':
        return (
          <input
            type="text"
            {...commonProps}
            minLength={field.min}
            maxLength={field.max}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            {...commonProps}
            min={field.min}
            max={field.max}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            {...commonProps}
          />
        );
      case 'boolean':
        return (
          <input
            type="checkbox"
            {...commonProps}
            checked={formData[field.name] || false}
            onChange={(e) => handleInputChange(field.name, e.target.checked)}
            className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="border-b bg-gray-50/40 p-6">
            <div className="flex items-center gap-2 text-2xl font-bold text-yellow-500">
              <FileText className="h-6 w-6" />
              {schema.title}
            </div>
            {schema.description && (
              <p className="mt-2 text-gray-600">{schema.description}</p>
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* Header Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50/50 p-4 rounded-lg">
              {headerItems.map(({ icon: Icon, label, value, iconClass }) => (
                <div key={label} className="flex items-center space-x-3 group">
                  <div className={`p-2 rounded-md ${iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">{label}</div>
                    <div className="font-semibold group-hover:text-yellow-500 transition-colors">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form Sections */}
            <div className="space-y-4">
              {Object.entries(sections).map(([key, section]) => {
                if (!groupedFields[key]?.length) return null;
                const Icon = section.icon;
                
                return (
                  <div key={key} className="border rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === key ? '' : key)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${section.iconClass}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{section.title}</span>
                      </div>
                      <svg
                        className={`h-5 w-5 transform transition-transform ${
                          openSection === key ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    
                    {openSection === key && (
                      <div className="p-4 bg-gray-50/30 space-y-6">
                        {groupedFields[key]?.map((field) => (
                          <div key={field.name} className="space-y-2">
                            <label
                              htmlFor={field.name}
                              className="block text-sm font-medium text-gray-700"
                            >
                              {field.name}
                              {field.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            {renderField(field)}
                            {field.description && (
                              <p className="text-sm text-gray-500">
                                {field.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-yellow-900 py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
