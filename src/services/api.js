const BASE_URL = process.env.NODE_ENV === 'development' ? '' : '';

export const api = {
  // Get all contracts
  getContracts: async () => {
    const response = await fetch('/contracts.json');
    if (!response.ok) {
      throw new Error('Failed to fetch contracts');
    }
    return response.json();
  },

  // Get contract by ID
  getContract: async (id) => {
    const contracts = await api.getContracts();
    const contract = contracts.find(c => c.id === id);
    
    if (!contract) {
      throw new Error('Contract not found');
    }

    // Mock detailed contract data
    return {
      ...contract,
      start: "2023-01-01",
      clauses: [
        { title: "Termination", summary: "90 days notice period.", confidence: 0.82 },
        { title: "Liability Cap", summary: "12 months' fees limit.", confidence: 0.87 },
        { title: "Data Privacy", summary: "GDPR compliance required.", confidence: 0.95 },
        { title: "Payment Terms", summary: "Net 30 payment terms.", confidence: 0.78 }
      ],
      insights: [
        { risk: "High", message: "Liability cap excludes data breach costs." },
        { risk: "Medium", message: "Renewal auto-renews unless cancelled 60 days before expiry." },
        { risk: "Low", message: "Standard termination clauses present." }
      ],
      evidence: [
        { source: "Section 12.2", snippet: "Total liability limited to 12 months' fees.", relevance: 0.91 },
        { source: "Section 8.1", snippet: "Either party may terminate with 90 days notice.", relevance: 0.85 },
        { source: "Section 15.3", snippet: "Auto-renewal unless notice given 60 days prior.", relevance: 0.78 }
      ]
    };
  },

  // Mock file upload
  uploadFile: async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          name: file.name,
          status: 'Success',
          uploadedAt: new Date().toISOString()
        });
      }, Math.random() * 2000 + 1000); // 1-3 second delay
    });
  }
};