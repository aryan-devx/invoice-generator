package in.aryan.invoicegeneratorapi.repository;

import in.aryan.invoicegeneratorapi.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String > {
    Optional<User> findByClerkId(String clerkId);
    Boolean existsByClerkId(String clerkId);
}
