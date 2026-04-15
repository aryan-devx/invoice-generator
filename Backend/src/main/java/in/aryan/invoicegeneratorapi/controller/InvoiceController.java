package in.aryan.invoicegeneratorapi.controller;

import in.aryan.invoicegeneratorapi.entity.Invoice;
import in.aryan.invoicegeneratorapi.service.EmailService;
import in.aryan.invoicegeneratorapi.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invoice")
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final EmailService emailService;


    @PostMapping
    public ResponseEntity<Invoice> saveInvoice(@RequestBody Invoice invoice, Authentication authentication) {
        invoice.setClerkId(authentication.getName());
        return ResponseEntity.ok(invoiceService.saveInvoice(invoice));
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> fetchInvoices(Authentication authentication) {
        return ResponseEntity.ok(invoiceService.fetchInvoices(authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeInvoice(@PathVariable String id, Authentication authentication) {
        if (authentication.getName() != null) {
            invoiceService.removeInvoice(id, authentication.getName());
            return ResponseEntity.noContent().build();
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not have permission to access this " +
                "resource");
    }
    @PostMapping("/sendinvoice")
    public ResponseEntity<?> sendInvoice(@RequestPart("file") MultipartFile file,
                                         @RequestPart("email") String customerEmail) {
        try {
            emailService.sendInvoiceEmail(customerEmail,  file);
            return ResponseEntity.ok("Invoice sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("failed to send invoice. ");
        }
    }

}


















