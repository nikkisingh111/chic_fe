import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FormContainer,
  FormTitle,
  FormGroup,
  Label,
  Select,
  CheckboxGroup,
  CheckboxLabel,
  ErrorMessage,
  SubmitButton
} from '../styled/FormElements';

const StyleFormContainer = styled(FormContainer)`
  max-width: 600px;
`;

const ColorSwatch = styled.div<{ color: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 8px;
  cursor: pointer;
  border: 2px solid ${props => props.theme.colors.cream};
  transition: all 0.2s ease;
  
  &.selected {
    border: 2px solid ${props => props.theme.colors.secondary};
    transform: scale(1.1);
  }
`;

const ColorSwatchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
`;

const RangeContainer = styled.div`
  margin-top: 12px;
`;

const RangeSlider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 8px;
  border-radius: 4px;
  background: ${props => props.theme.colors.primary};
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.theme.colors.secondary};
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.theme.colors.secondary};
    cursor: pointer;
  }
`;

const BudgetLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-size: 0.8rem;
`;

const StyleSetupForm: React.FC = () => {
  const navigate = useNavigate();
  
  const styleOptions = ['Casual', 'Chic', 'Streetwear', 'Minimalist', 'Formal', 'Boho', 'Other'];
  const colorOptions = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', '#33FFF3', '#000000', '#FFFFFF'];
  const bodyShapeOptions = ['Slim', 'Athletic', 'Curvy', 'Petite', 'Plus-size', 'Prefer not to say'];
  const occasionOptions = ['Work', 'Travel', 'Date Night', 'Everyday Wear', 'Events'];

  const formik = useFormik({
    initialValues: {
      preferredStyles: [] as string[],
      favoriteColors: [] as string[],
      bodyShape: '',
      topSize: '',
      bottomSize: '',
      shoeSize: '',
      budgetPreference: 2,
      occasions: [] as string[]
    },
    validationSchema: Yup.object({
      preferredStyles: Yup.array().min(1, 'Please select at least one style'),
      favoriteColors: Yup.array().min(1, 'Please select at least one color'),
      bodyShape: Yup.string().required('Please select your body shape'),
      topSize: Yup.string().required('Top size is required'),
      bottomSize: Yup.string().required('Bottom size is required'),
      shoeSize: Yup.string().required('Shoe size is required'),
      occasions: Yup.array().min(1, 'Please select at least one occasion')
    }),
    onSubmit: async (values) => {
      try {
        // Here you would typically make an API call to your backend
        console.log('Style preferences submitted:', values);
        
        // For now, we'll just simulate a successful submission
        localStorage.setItem('stylePreferencesSet', 'true');
        
        // Redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Style preferences error:', error);
      }
    }
  });

  const handleStyleChange = (style: string) => {
    const currentStyles = [...formik.values.preferredStyles];
    if (currentStyles.includes(style)) {
      formik.setFieldValue(
        'preferredStyles',
        currentStyles.filter(s => s !== style)
      );
    } else {
      formik.setFieldValue('preferredStyles', [...currentStyles, style]);
    }
  };

  const handleColorChange = (color: string) => {
    const currentColors = [...formik.values.favoriteColors];
    if (currentColors.includes(color)) {
      formik.setFieldValue(
        'favoriteColors',
        currentColors.filter(c => c !== color)
      );
    } else {
      formik.setFieldValue('favoriteColors', [...currentColors, color]);
    }
  };

  const handleOccasionChange = (occasion: string) => {
    const currentOccasions = [...formik.values.occasions];
    if (currentOccasions.includes(occasion)) {
      formik.setFieldValue(
        'occasions',
        currentOccasions.filter(o => o !== occasion)
      );
    } else {
      formik.setFieldValue('occasions', [...currentOccasions, occasion]);
    }
  };

  return (
    <StyleFormContainer>
      <FormTitle>Let's Find Your Style ✨</FormTitle>
      
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label>Preferred Style</Label>
          <CheckboxGroup>
            {styleOptions.map(style => (
              <CheckboxLabel key={style}>
                <input
                  type="checkbox"
                  name="preferredStyles"
                  value={style}
                  checked={formik.values.preferredStyles.includes(style)}
                  onChange={() => handleStyleChange(style)}
                  onBlur={formik.handleBlur}
                />
                {style}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
          {formik.touched.preferredStyles && formik.errors.preferredStyles ? (
            <ErrorMessage>{formik.errors.preferredStyles as string}</ErrorMessage>
          ) : null}
        </FormGroup>

        <FormGroup>
          <Label>Favorite Colors</Label>
          <ColorSwatchContainer>
            {colorOptions.map(color => (
              <ColorSwatch
                key={color}
                color={color}
                className={formik.values.favoriteColors.includes(color) ? 'selected' : ''}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </ColorSwatchContainer>
          {formik.touched.favoriteColors && formik.errors.favoriteColors ? (
            <ErrorMessage>{formik.errors.favoriteColors as string}</ErrorMessage>
          ) : null}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="bodyShape">Body Shape</Label>
          <Select
            id="bodyShape"
            name="bodyShape"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bodyShape}
          >
            <option value="">Select your body shape</option>
            {bodyShapeOptions.map(shape => (
              <option key={shape} value={shape.toLowerCase()}>{shape}</option>
            ))}
          </Select>
          {formik.touched.bodyShape && formik.errors.bodyShape ? (
            <ErrorMessage>{formik.errors.bodyShape}</ErrorMessage>
          ) : null}
        </FormGroup>

        <FormGroup>
          <Label>Clothing Sizes</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <Label htmlFor="topSize" style={{ fontSize: '0.9rem' }}>Top</Label>
              <Select
                id="topSize"
                name="topSize"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.topSize}
              >
                <option value="">Select</option>
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="bottomSize" style={{ fontSize: '0.9rem' }}>Bottom</Label>
              <Select
                id="bottomSize"
                name="bottomSize"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bottomSize}
              >
                <option value="">Select</option>
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="shoeSize" style={{ fontSize: '0.9rem' }}>Shoe</Label>
              <Select
                id="shoeSize"
                name="shoeSize"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.shoeSize}
              >
                <option value="">Select</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </Select>
            </div>
          </div>
          {(formik.touched.topSize && formik.errors.topSize) || 
           (formik.touched.bottomSize && formik.errors.bottomSize) || 
           (formik.touched.shoeSize && formik.errors.shoeSize) ? (
            <ErrorMessage>
              {formik.errors.topSize || formik.errors.bottomSize || formik.errors.shoeSize}
            </ErrorMessage>
          ) : null}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="budgetPreference">Budget Preference</Label>
          <RangeContainer>
            <RangeSlider
              type="range"
              id="budgetPreference"
              name="budgetPreference"
              min="1"
              max="4"
              step="1"
              onChange={formik.handleChange}
              value={formik.values.budgetPreference}
            />
            <BudgetLabels>
              <span>$</span>
              <span>$$</span>
              <span>$$$</span>
              <span>$$$$</span>
            </BudgetLabels>
          </RangeContainer>
        </FormGroup>

        <FormGroup>
          <Label>Occasions</Label>
          <CheckboxGroup>
            {occasionOptions.map(occasion => (
              <CheckboxLabel key={occasion}>
                <input
                  type="checkbox"
                  name="occasions"
                  value={occasion}
                  checked={formik.values.occasions.includes(occasion)}
                  onChange={() => handleOccasionChange(occasion)}
                  onBlur={formik.handleBlur}
                />
                {occasion}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
          {formik.touched.occasions && formik.errors.occasions ? (
            <ErrorMessage>{formik.errors.occasions as string}</ErrorMessage>
          ) : null}
        </FormGroup>

        <SubmitButton type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Saving...' : 'Continue'}
        </SubmitButton>
      </form>
    </StyleFormContainer>
  );
};

export default StyleSetupForm;