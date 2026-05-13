package com.healthgov.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentRequestDTO {

    @NotBlank
    @Size(min = 2, max = 100)
    private String documentName;

    @NotBlank
    private String documentType;

    @NotBlank
    private String fileUrl;  // removed @Size(max=500) to support Base64 file content
}
