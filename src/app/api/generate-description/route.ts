import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let propertyDescription = '';
    let locationDescription = '';
    let investmentSummary = '';

    if (data.category === 'Commercial') {
      propertyDescription = `Introducing an exceptional ${data.propertyType || 'Commercial'} opportunity at ${data.streetAddress || 'a prime location'}. Spanning ${data.buildingSizeSqFt || 'ample'} square feet, this property features ${data.highlights?.[0] || 'excellent amenities'} and ${data.highlights?.[1] || 'great potential'}. The versatile layout is perfect for a variety of business concepts seeking strong visibility.`;
      
      locationDescription = `Strategically positioned in ${data.city || 'a thriving market'}, this site benefits from high traffic counts and excellent demographics. It offers easy access to major thoroughfares, placing it squarely in the path of growth.`;
      
      investmentSummary = `Offered at ${data.askingPrice || data.askingRent || 'market rates'}, this property represents a compelling value-add opportunity with strong fundamentals.`;
    } else {
      propertyDescription = `Welcome to this stunning ${data.bedrooms || 'beautiful'} bedroom, ${data.bathrooms || 'well-appointed'} bathroom home located at ${data.streetAddress || 'a highly desirable address'}. Featuring ${data.highlights?.[0] || 'an open floor plan'} and ${data.highlights?.[1] || 'modern finishes'}, this residence seamlessly blends comfort with elegant design.`;
      
      locationDescription = `Nestled in a peaceful neighborhood in ${data.city || 'the heart of the city'}, residents will enjoy proximity to top-rated schools, lush parks, and premier dining destinations.`;
    }

    return NextResponse.json({
      propertyDescription,
      locationDescription,
      investmentSummary
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
